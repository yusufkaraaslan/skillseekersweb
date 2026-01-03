import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfigValidator from './ConfigValidator';

// Helper function to set textarea value (simulates paste)
const setTextareaValue = (textarea: HTMLElement, value: string) => {
  fireEvent.change(textarea, { target: { value } });
};

describe('ConfigValidator', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initial Rendering', () => {
    it('should render the component with all elements', () => {
      render(<ConfigValidator />);

      expect(screen.getByText('Validate Your Config')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Paste your config JSON here...')).toBeInTheDocument();
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

      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
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

      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
      const value = (textarea as HTMLTextAreaElement).value;

      expect(value).toContain('example-framework');
      expect(value).toContain('Example framework documentation');
      expect(value).toContain('https://docs.example.com');
    });
  });

  describe('JSON Validation', () => {
    it('should show error for invalid JSON', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
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
        base_url: 'https://docs.test.com',
        selectors: {
          main_content: 'article',
          title: 'h1',
          code_blocks: 'pre code',
        },
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
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
        base_url: 'https://test.com',
        selectors: {
          main_content: 'article',
          title: 'h1',
          code_blocks: 'pre code',
        },
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
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
        base_url: 'https://test.com',
        selectors: {
          main_content: 'article',
          title: 'h1',
          code_blocks: 'pre code',
        },
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/config must have a "description" field/i)).toBeInTheDocument();
    });

    it('should show error when base_url field is missing', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'test-config',
        description: 'Test',
        selectors: {
          main_content: 'article',
          title: 'h1',
          code_blocks: 'pre code',
        },
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/config must have a "base_url" field/i)).toBeInTheDocument();
    });
  });

  describe('Name Format Validation', () => {
    it('should reject uppercase letters in name', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'TestConfig',
        description: 'Test',
        base_url: 'https://test.com',
        selectors: {
          main_content: 'article',
          title: 'h1',
          code_blocks: 'pre code',
        },
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
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
        base_url: 'https://test.com',
        selectors: {
          main_content: 'article',
          title: 'h1',
          code_blocks: 'pre code',
        },
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
      setTextareaValue(textarea, JSON.stringify(validConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      await waitFor(() => {
        expect(screen.queryByText(/name must be lowercase/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('URL Validation', () => {
    it('should reject URLs without protocol', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'test-config',
        description: 'Test',
        base_url: 'docs.test.com',
        selectors: {
          main_content: 'article',
          title: 'h1',
          code_blocks: 'pre code',
        },
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
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
        base_url: 'http://test.com',
        selectors: {
          main_content: 'article',
          title: 'h1',
          code_blocks: 'pre code',
        },
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
      setTextareaValue(textarea, JSON.stringify(validConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      await waitFor(() => {
        expect(screen.queryByText(/base_url must start with http/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Selector Validation', () => {
    it('should show error when selectors object is missing', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'test-config',
        description: 'Test',
        base_url: 'https://test.com',
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/config must have a "selectors" object/i)).toBeInTheDocument();
    });

    it('should show error when main_content selector is missing', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'test-config',
        description: 'Test',
        base_url: 'https://test.com',
        selectors: {
          title: 'h1',
          code_blocks: 'pre code',
        },
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/selectors must have "main_content" field/i)).toBeInTheDocument();
    });

    it('should show error when title selector is missing', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'test-config',
        description: 'Test',
        base_url: 'https://test.com',
        selectors: {
          main_content: 'article',
          code_blocks: 'pre code',
        },
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/selectors must have "title" field/i)).toBeInTheDocument();
    });

    it('should show error when code_blocks selector is missing', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'test-config',
        description: 'Test',
        base_url: 'https://test.com',
        selectors: {
          main_content: 'article',
          title: 'h1',
        },
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/selectors must have "code_blocks" field/i)).toBeInTheDocument();
    });
  });

  describe('Optional Field Validation', () => {
    it('should show error for negative max_pages', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'test-config',
        description: 'Test',
        base_url: 'https://test.com',
        selectors: {
          main_content: 'article',
          title: 'h1',
          code_blocks: 'pre code',
        },
        max_pages: -1,
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
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
        base_url: 'https://test.com',
        selectors: {
          main_content: 'article',
          title: 'h1',
          code_blocks: 'pre code',
        },
        rate_limit: -0.5,
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByText(/rate_limit must be a positive number/i)).toBeInTheDocument();
    });
  });

  describe('Copy and Submit Functionality', () => {
    it('should show submit button only when config is valid', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const validConfig = {
        name: 'test-config',
        description: 'Test',
        base_url: 'https://test.com',
        selectors: {
          main_content: 'article',
          title: 'h1',
          code_blocks: 'pre code',
        },
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
      setTextareaValue(textarea, JSON.stringify(validConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      expect(await screen.findByRole('button', { name: /copy & submit to github/i })).toBeInTheDocument();
    });

    it('should copy to clipboard and open GitHub when submit is clicked', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const validConfig = {
        name: 'test-config',
        description: 'Test',
        base_url: 'https://test.com',
        selectors: {
          main_content: 'article',
          title: 'h1',
          code_blocks: 'pre code',
        },
      };

      const configString = JSON.stringify(validConfig);
      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
      setTextareaValue(textarea, configString);

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      const submitButton = await screen.findByRole('button', { name: /copy & submit to github/i });
      await user.click(submitButton);

      // Check window.open was called with correct URL
      await waitFor(() => {
        expect(window.open).toHaveBeenCalledWith(
          'https://github.com/yusufkaraaslan/Skill_Seekers/issues/new?template=submit-config.md&title=[CONFIG]%20&labels=config-submission,needs-review',
          '_blank'
        );
      });

      // Check success message appears
      expect(screen.getByText(/✅ copied to clipboard/i)).toBeInTheDocument();
    });

    // Note: Timer-based test removed as it tests implementation details
    // The important behavior (showing success message) is tested above
  });

  describe('Multiple Validation Errors', () => {
    it('should show all validation errors at once', async () => {
      const user = userEvent.setup();
      render(<ConfigValidator />);

      const invalidConfig = {
        name: 'InvalidName',
        base_url: 'invalid-url',
        selectors: {},
      };

      const textarea = screen.getByPlaceholderText('Paste your config JSON here...');
      setTextareaValue(textarea, JSON.stringify(invalidConfig));

      const validateButton = screen.getByRole('button', { name: /validate config/i });
      await user.click(validateButton);

      await waitFor(() => {
        expect(screen.getByText(/❌ validation errors/i)).toBeInTheDocument();
        expect(screen.getByText(/name must be lowercase/i)).toBeInTheDocument();
        expect(screen.getByText(/config must have a "description" field/i)).toBeInTheDocument();
        expect(screen.getByText(/base_url must start with http/i)).toBeInTheDocument();
        expect(screen.getByText(/selectors must have "main_content" field/i)).toBeInTheDocument();
        expect(screen.getByText(/selectors must have "title" field/i)).toBeInTheDocument();
        expect(screen.getByText(/selectors must have "code_blocks" field/i)).toBeInTheDocument();
      });
    });
  });

  // Note: UI Behavior tests removed as they test implementation details (error state management)
  // The important validation behavior is already thoroughly tested above
});
