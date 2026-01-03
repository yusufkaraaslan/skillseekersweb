import { useState } from 'react';

interface ValidationError {
  field: string;
  message: string;
}

export default function ConfigValidator() {
  const [configJson, setConfigJson] = useState('');
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [issueUrl, setIssueUrl] = useState<string | null>(null);

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

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);
      setIssueUrl(null);

      const config = JSON.parse(configJson);

      const response = await fetch('/api/submit-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ config }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit config');
      }

      setSubmitSuccess(true);
      setIssueUrl(data.issueUrl);
      setConfigJson(''); // Clear the form
      setIsValid(false);
      setErrors([]);
    } catch (error) {
      setSubmitError((error as Error).message);
    } finally {
      setSubmitting(false);
    }
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
        {isValid && errors.length === 0 && configJson.trim() && !submitSuccess && (
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h4 className="font-semibold text-green-400 mb-2">✅ Config is Valid!</h4>
            <p className="text-sm text-green-300 mb-4">
              Your configuration looks good. Click below to submit to GitHub.
            </p>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:hover:scale-100"
            >
              {submitting ? (
                <>
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent"></span>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>🚀 Submit Config</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Submit Success */}
        {submitSuccess && issueUrl && (
          <div className="mt-6 p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h4 className="font-semibold text-green-400 mb-2 text-lg">🎉 Config Submitted Successfully!</h4>
            <p className="text-sm text-green-300 mb-4">
              Your config has been submitted for review. Our team will review it and add it to the repository.
            </p>
            <div className="space-y-3">
              <a
                href={issueUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              >
                <span>View GitHub Issue</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <button
                onClick={() => {
                  setSubmitSuccess(false);
                  setIssueUrl(null);
                }}
                className="ml-3 px-6 py-3 bg-dark-bg hover:bg-dark-border text-dark-text-secondary hover:text-white rounded-lg transition-colors"
              >
                Submit Another Config
              </button>
            </div>
          </div>
        )}

        {/* Submit Error */}
        {submitError && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <h4 className="font-semibold text-red-400 mb-2">❌ Submission Failed</h4>
            <p className="text-sm text-red-300 mb-3">
              {submitError}
            </p>
            <button
              onClick={() => setSubmitError(null)}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 p-4 bg-dark-bg border border-dark-border/50 rounded-lg">
          <h4 className="text-sm font-semibold text-dark-text-primary mb-2">📝 Submission Steps:</h4>
          <ol className="text-sm text-dark-text-secondary space-y-1 list-decimal list-inside">
            <li>Paste your config JSON above</li>
            <li>Click "Validate Config" to check for errors</li>
            <li>Fix any validation errors if needed</li>
            <li>Click "🚀 Submit Config" - that's it!</li>
            <li>Your config will be automatically submitted for review</li>
            <li>Track the review status via the GitHub Issue link</li>
          </ol>
          <p className="mt-3 text-xs text-dark-text-secondary/70">
            ✨ Automatic submission - no manual copying or pasting required!
          </p>
        </div>
      </div>
    </div>
  );
}
