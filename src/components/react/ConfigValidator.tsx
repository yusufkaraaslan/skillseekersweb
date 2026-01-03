import { useState } from 'react';

interface ValidationError {
  field: string;
  message: string;
}

export default function ConfigValidator() {
  const [configJson, setConfigJson] = useState('');
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateConfig = (jsonString: string) => {
    const newErrors: ValidationError[] = [];

    if (!jsonString.trim()) {
      setErrors([]);
      setIsValid(false);
      return;
    }

    try {
      const config = JSON.parse(jsonString);

      // Required fields validation
      if (!config.name || typeof config.name !== 'string') {
        newErrors.push({ field: 'name', message: 'Config must have a "name" field (string)' });
      } else if (!/^[a-z0-9-_]+$/.test(config.name)) {
        newErrors.push({ field: 'name', message: 'Name must be lowercase alphanumeric with hyphens/underscores only' });
      }

      if (!config.description || typeof config.description !== 'string') {
        newErrors.push({ field: 'description', message: 'Config must have a "description" field (string)' });
      }

      if (!config.base_url || typeof config.base_url !== 'string') {
        newErrors.push({ field: 'base_url', message: 'Config must have a "base_url" field (string)' });
      } else if (!config.base_url.startsWith('http://') && !config.base_url.startsWith('https://')) {
        newErrors.push({ field: 'base_url', message: 'base_url must start with http:// or https://' });
      }

      // Selectors validation
      if (!config.selectors || typeof config.selectors !== 'object') {
        newErrors.push({ field: 'selectors', message: 'Config must have a "selectors" object' });
      } else {
        if (!config.selectors.main_content) {
          newErrors.push({ field: 'selectors.main_content', message: 'selectors must have "main_content" field' });
        }
        if (!config.selectors.title) {
          newErrors.push({ field: 'selectors.title', message: 'selectors must have "title" field' });
        }
        if (!config.selectors.code_blocks) {
          newErrors.push({ field: 'selectors.code_blocks', message: 'selectors must have "code_blocks" field' });
        }
      }

      // Optional but recommended fields
      if (config.max_pages !== undefined && config.max_pages !== null) {
        if (typeof config.max_pages !== 'number' || config.max_pages < 1) {
          newErrors.push({ field: 'max_pages', message: 'max_pages must be a positive number (or null for unlimited)' });
        }
      }

      if (config.rate_limit !== undefined) {
        if (typeof config.rate_limit !== 'number' || config.rate_limit < 0) {
          newErrors.push({ field: 'rate_limit', message: 'rate_limit must be a positive number (seconds)' });
        }
      }

      setErrors(newErrors);
      setIsValid(newErrors.length === 0);

    } catch (e) {
      setErrors([{ field: 'json', message: 'Invalid JSON format. Please check syntax.' }]);
      setIsValid(false);
    }
  };

  const handleValidate = () => {
    validateConfig(configJson);
  };

  const handleCopyAndSubmit = () => {
    navigator.clipboard.writeText(configJson);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);

    // Open GitHub issue in new tab
    const issueUrl = `https://github.com/yusufkaraaslan/Skill_Seekers/issues/new?template=submit-config.md&title=[CONFIG]%20&labels=config-submission,needs-review`;
    window.open(issueUrl, '_blank');
  };

  const exampleConfig = {
    name: "example-framework",
    description: "Example framework documentation",
    base_url: "https://docs.example.com",
    selectors: {
      main_content: "article",
      title: "h1",
      code_blocks: "pre code"
    },
    url_patterns: {
      include: [],
      exclude: []
    },
    categories: {},
    rate_limit: 0.5,
    max_pages: 100
  };

  const loadExample = () => {
    setConfigJson(JSON.stringify(exampleConfig, null, 2));
    setErrors([]);
    setIsValid(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-dark-surface border border-dark-border rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-2">Validate Your Config</h3>
        <p className="text-dark-text-secondary mb-6">
          Paste your config JSON below to validate it before submitting to GitHub.
        </p>

        {/* Textarea */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-dark-text-primary">
              Config JSON
            </label>
            <button
              onClick={loadExample}
              className="text-sm text-brand-primary hover:text-brand-secondary transition-colors"
            >
              Load Example
            </button>
          </div>
          <textarea
            value={configJson}
            onChange={(e) => {
              setConfigJson(e.target.value);
              setErrors([]);
              setIsValid(false);
            }}
            placeholder='Paste your config JSON here...'
            className="w-full h-64 px-4 py-3 bg-dark-bg border border-dark-border rounded-lg font-mono text-sm text-dark-text-primary placeholder-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none"
          />
        </div>

        {/* Validate Button */}
        <button
          onClick={handleValidate}
          disabled={!configJson.trim()}
          className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          🔍 Validate Config
        </button>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <h4 className="font-semibold text-red-400 mb-2">❌ Validation Errors:</h4>
            <ul className="space-y-1">
              {errors.map((error, idx) => (
                <li key={idx} className="text-sm text-red-300">
                  <span className="font-mono text-xs bg-red-500/20 px-2 py-0.5 rounded">
                    {error.field}
                  </span>
                  {' '}{error.message}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-red-300">
              Fix these errors before submitting to GitHub.
            </p>
          </div>
        )}

        {/* Success */}
        {isValid && errors.length === 0 && configJson.trim() && (
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h4 className="font-semibold text-green-400 mb-2">✅ Config is Valid!</h4>
            <p className="text-sm text-green-300 mb-4">
              Your configuration looks good. Click below to copy and submit to GitHub.
            </p>
            <button
              onClick={handleCopyAndSubmit}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
            >
              <span>📋 Copy & Submit to GitHub</span>
            </button>
            {showSuccess && (
              <p className="mt-3 text-sm text-green-400 font-medium">
                ✅ Copied to clipboard! Opening GitHub issue...
              </p>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 p-4 bg-dark-bg border border-dark-border/50 rounded-lg">
          <h4 className="text-sm font-semibold text-dark-text-primary mb-2">📝 Submission Steps:</h4>
          <ol className="text-sm text-dark-text-secondary space-y-1 list-decimal list-inside">
            <li>Paste your config JSON above</li>
            <li>Click "Validate Config" to check for errors</li>
            <li>Fix any validation errors</li>
            <li>Click "Copy & Submit to GitHub" when valid</li>
            <li>Paste the config in the GitHub issue that opens</li>
            <li>Fill in additional details and submit</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
