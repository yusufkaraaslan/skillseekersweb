import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfigValidator from './ConfigValidator';

// Mock fetch for submit tests
global.fetch = vi.fn();

// Mock window.scrollTo
window.scrollTo = vi.fn();

// Helper function to set textarea value (simulates paste)
const setTextareaValue = (textarea: HTMLElement, value: string) => {
  fireEvent.change(textarea, { target: { value } });
};

describe('ConfigValidator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => ({ issueUrl: 'https://github.com/test/repo/issues/1' }),
    });
  });

  describe('Initial Rendering', () => {
    it('should render the component with all elements', () => {
      render(<ConfigValidator />);

      expect(screen.getByText('Validate Your Config')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /validate config/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /load example/i })).toBeInTheDocument();
    });

    it('should have validate button disabled when textarea is empty', () => {
      render(<ConfigValidator />);
      const validateButton = screen.getByRole('button', { name: /validate config/i });
      expect(validateButton).toBeDisabled();
    });

    it('should enable validate button when text is entered', () => {
      render(<ConfigValidator />);

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      const validateButton = screen.getByRole('button', { name: /validate config/i });

      setTextareaValue(textarea, '{"test": "value"}');
      expect(validateButton).not.toBeDisabled();
    });
  });

  describe('Example Config Loading', () => {
    it('should load example config when Load Example is clicked', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const loadExampleButton = screen.getByRole('button', { name: /load example/i });
      await user.click(loadExampleButton);

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      const value = (textarea as HTMLTextAreaElement).value;

      expect(value).toContain('vue');
      expect(value).toContain('Complete Vue.js framework knowledge');
      expect(value).toContain('https://vuejs.org/');
    });
  });

  describe('JSON Validation', () => {
    it('should show error for invalid JSON', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      setTextareaValue(textarea, '{invalid json}');

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/invalid json format/i)).toBeInTheDocument();
    });

    it('should not show errors for valid complete config', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const validConfig = {
        name: 'test-framework',
        description: 'Test framework documentation',
        sources: [
          {
            type: 'documentation',
            base_url: 'https://docs.test.com',
            selectors: {
              main_content: 'article',
              title: 'h1',
              code_blocks: 'pre code',
            },
          },
        ],
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      setTextareaValue(textarea, JSON.stringify(validConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      await waitFor(() => {
        expect(screen.getByText(/config is valid/i)).toBeInTheDocument();
        expect(screen.queryByText(/❌ validation errors/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Required Field Validation', () => {
    it('should show error when name field is missing', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        description: 'Test',
        sources: [
          {
            type: 'documentation',
            base_url: 'https://test.com',
          },
        ],
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/config must have a "name" field/i)).toBeInTheDocument();
    });

    it('should show error when description field is missing', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'test-config',
        sources: [
          {
            type: 'documentation',
            base_url: 'https://test.com',
          },
        ],
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/config must have a "description" field/i)).toBeInTheDocument();
    });

    it('should show error when sources array is missing', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'test-config',
        description: 'Test',
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/config must have a "sources" array/i)).toBeInTheDocument();
    });
  });

  describe('Name Format Validation', () => {
    it('should reject uppercase letters in name', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'TestConfig',
        description: 'Test',
        sources: [
          {
            type: 'documentation',
            base_url: 'https://test.com',
          },
        ],
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/name must be lowercase/i)).toBeInTheDocument();
    });

    it('should accept lowercase with hyphens and underscores', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const validConfig = {
        name: 'test-config_v2',
        description: 'Test',
        sources: [
          {
            type: 'documentation',
            base_url: 'https://test.com',
          },
        ],
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      setTextareaValue(textarea, JSON.stringify(validConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      await waitFor(() => {
        expect(screen.queryByText(/name must be lowercase/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Sources Array Validation', () => {
    it('should reject empty sources array', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'test-config',
        description: 'Test',
        sources: [],
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/"sources" array cannot be empty/i)).toBeInTheDocument();
    });

    it('should reject non-array sources', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'test-config',
        description: 'Test',
        sources: 'not an array',
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/"sources" must be an array/i)).toBeInTheDocument();
    });
  });

  describe('Documentation Source Validation', () => {
    it('should reject URLs without protocol', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'test-config',
        description: 'Test',
        sources: [
          {
            type: 'documentation',
            base_url: 'docs.test.com',
          },
        ],
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/base_url must start with http/i)).toBeInTheDocument();
    });

    it('should accept http:// protocol', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const validConfig = {
        name: 'test-config',
        description: 'Test',
        sources: [
          {
            type: 'documentation',
            base_url: 'http://test.com',
          },
        ],
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      setTextareaValue(textarea, JSON.stringify(validConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      await waitFor(() => {
        expect(screen.queryByText(/base_url must start with http/i)).not.toBeInTheDocument();
      });
    });

    it('should show error for negative max_pages', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'test-config',
        description: 'Test',
        sources: [
          {
            type: 'documentation',
            base_url: 'https://test.com',
            max_pages: -2,
          },
        ],
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/max_pages must be a positive number/i)).toBeInTheDocument();
    });

    it('should show error for negative rate_limit', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'test-config',
        description: 'Test',
        sources: [
          {
            type: 'documentation',
            base_url: 'https://test.com',
            rate_limit: -0.5,
          },
        ],
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/rate_limit must be a positive number/i)).toBeInTheDocument();
    });
  });

  describe('GitHub Source Validation', () => {
    it('should require repo field for GitHub source', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'test-config',
        description: 'Test',
        sources: [
          {
            type: 'github',
          },
        ],
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/GitHub source must have "repo" field/i)).toBeInTheDocument();
    });

    it('should validate repo format', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'test-config',
        description: 'Test',
        sources: [
          {
            type: 'github',
            repo: 'invalid-format',
          },
        ],
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/repo must be in format "owner\/repo"/i)).toBeInTheDocument();
    });
  });

  describe('PDF Source Validation', () => {
    it('should require path field for PDF source', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'test-config',
        description: 'Test',
        sources: [
          {
            type: 'pdf',
          },
        ],
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/PDF source must have "path" field/i)).toBeInTheDocument();
    });
  });

  describe('Submit Functionality', () => {
    it('should show submit button only when config is valid', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const validConfig = {
        name: 'test-config',
        description: 'Test',
        sources: [
          {
            type: 'documentation',
            base_url: 'https://test.com',
          },
        ],
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      setTextareaValue(textarea, JSON.stringify(validConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByRole('button', { name: /submit config/i })).toBeInTheDocument();
    });

    it('should submit config and show success message', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const validConfig = {
        name: 'test-config',
        description: 'Test',
        sources: [
          {
            type: 'documentation',
            base_url: 'https://test.com',
          },
        ],
      };

      const configString = JSON.stringify(validConfig);
      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      setTextareaValue(textarea, configString);

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      const submitButton = await screen.findByRole('button', { name: /submit config/i });
      await user.click(submitButton);

      // Check fetch was called with correct data
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/submit-config', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ config: validConfig }),
        });
      });

      // Check success message appears
      expect(await screen.findByText(/config submitted successfully/i)).toBeInTheDocument();
      expect(screen.getByText(/view github issue/i)).toBeInTheDocument();
    });
  });

  describe('Multiple Validation Errors', () => {
    it('should show all validation errors at once', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'InvalidName',
        sources: 'not-an-array',
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here, or click "Load Example" above...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      await waitFor(() => {
        expect(screen.getByText(/❌ validation errors/i)).toBeInTheDocument();
        expect(screen.getByText(/name must be lowercase/i)).toBeInTheDocument();
        expect(screen.getByText(/config must have a "description" field/i)).toBeInTheDocument();
        expect(screen.getByText(/"sources" must be an array/i)).toBeInTheDocument();
      });
    });
  });
});
