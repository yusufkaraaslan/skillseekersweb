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

      // Required top-level fields
      if (!config.name || typeof config.name !== 'string') {
        newErrors.push({ field: 'name', message: 'Config must have a "name" field (string)' });
      } else if (!/^[a-z0-9-_]+$/.test(config.name)) {
        newErrors.push({ field: 'name', message: 'Name must be lowercase alphanumeric with hyphens/underscores only' });
      }

      if (!config.description || typeof config.description !== 'string') {
        newErrors.push({ field: 'description', message: 'Config must have a "description" field (string)' });
      }

      // Validate sources array (required)
      if (!config.sources) {
        newErrors.push({ field: 'sources', message: 'Config must have a "sources" array' });
      } else if (!Array.isArray(config.sources)) {
        newErrors.push({ field: 'sources', message: '"sources" must be an array' });
      } else if (config.sources.length === 0) {
        newErrors.push({ field: 'sources', message: '"sources" array cannot be empty (at least 1 source required)' });
      } else {
        // Validate each source
        config.sources.forEach((source: any, index: number) => {
          const sourceErrors = validateSource(source, index);
          newErrors.push(...sourceErrors);
        });
      }

      // Validate optional merge_mode
      if (config.merge_mode && !['rule-based', 'claude-enhanced'].includes(config.merge_mode)) {
        newErrors.push({ field: 'merge_mode', message: 'merge_mode must be "rule-based" or "claude-enhanced"' });
      }

      setErrors(newErrors);
      setIsValid(newErrors.length === 0);

    } catch (e) {
      setErrors([{ field: 'json', message: 'Invalid JSON format. Please check syntax.' }]);
      setIsValid(false);
    }
  };

  const validateSource = (source: any, index: number): ValidationError[] => {
    const errors: ValidationError[] = [];
    const prefix = `sources[${index}]`;

    // Check type field
    if (!source.type) {
      errors.push({ field: `${prefix}.type`, message: 'Source must have a "type" field' });
      return errors;
    }

    const validTypes = ['documentation', 'github', 'pdf', 'local', 'word', 'epub', 'video', 'jupyter', 'html', 'openapi', 'asciidoc', 'pptx', 'rss', 'manpage', 'confluence', 'notion', 'chat'];
    if (!validTypes.includes(source.type)) {
      errors.push({ field: `${prefix}.type`, message: `Type must be one of: ${validTypes.join(', ')}` });
      return errors;
    }

    // Type-specific validation
    if (source.type === 'documentation') {
      if (!source.base_url || typeof source.base_url !== 'string') {
        errors.push({ field: `${prefix}.base_url`, message: 'Documentation source must have "base_url" (string)' });
      } else if (!source.base_url.startsWith('http://') && !source.base_url.startsWith('https://')) {
        errors.push({ field: `${prefix}.base_url`, message: 'base_url must start with http:// or https://' });
      }

      // Optional selectors validation
      if (source.selectors && typeof source.selectors !== 'object') {
        errors.push({ field: `${prefix}.selectors`, message: 'selectors must be an object' });
      }

      // Optional max_pages validation (omit for unlimited, use null/-1 for explicit unlimited)
      if (source.max_pages !== undefined && source.max_pages !== null && source.max_pages !== -1) {
        if (typeof source.max_pages !== 'number' || source.max_pages < 1) {
          errors.push({ field: `${prefix}.max_pages`, message: 'max_pages must be a positive number, null, -1, or omitted for unlimited' });
        }
      }

      // Optional rate_limit validation
      if (source.rate_limit !== undefined) {
        if (typeof source.rate_limit !== 'number' || source.rate_limit < 0) {
          errors.push({ field: `${prefix}.rate_limit`, message: 'rate_limit must be a positive number' });
        }
      }
    } else if (source.type === 'github') {
      if (!source.repo || typeof source.repo !== 'string') {
        errors.push({ field: `${prefix}.repo`, message: 'GitHub source must have "repo" field (string)' });
      } else if (!source.repo.includes('/')) {
        errors.push({ field: `${prefix}.repo`, message: 'repo must be in format "owner/repo" (e.g., "facebook/react")' });
      }

      // Optional code_analysis_depth validation
      const validDepths = ['surface', 'deep', 'full'];
      if (source.code_analysis_depth && !validDepths.includes(source.code_analysis_depth)) {
        errors.push({ field: `${prefix}.code_analysis_depth`, message: `Must be one of: ${validDepths.join(', ')}` });
      }

      // Optional max_issues validation
      if (source.max_issues !== undefined) {
        if (typeof source.max_issues !== 'number' || source.max_issues < 1) {
          errors.push({ field: `${prefix}.max_issues`, message: 'max_issues must be a positive number' });
        }
      }

      // Optional ai_mode validation
      const validAiModes = ['auto', 'api', 'local', 'none'];
      if (source.ai_mode && !validAiModes.includes(source.ai_mode)) {
        errors.push({ field: `${prefix}.ai_mode`, message: `Must be one of: ${validAiModes.join(', ')}` });
      }
    } else if (source.type === 'pdf') {
      if (!source.path || typeof source.path !== 'string') {
        errors.push({ field: `${prefix}.path`, message: 'PDF source must have "path" field (string)' });
      }
    }

    return errors;
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
    name: "vue",
    description: "Complete Vue.js framework knowledge combining official documentation and Vue.js codebase. Use when building Vue applications, understanding reactivity internals, or debugging Vue issues.",
    merge_mode: "rule-based",
    sources: [
      {
        type: "documentation",
        base_url: "https://vuejs.org/",
        extract_api: true,
        start_urls: [
          "https://vuejs.org/guide/introduction.html",
          "https://vuejs.org/guide/quick-start.html",
          "https://vuejs.org/api/"
        ],
        selectors: {
          main_content: "main",
          title: "h1",
          code_blocks: "pre code"
        },
        url_patterns: {
          include: ["/guide/", "/api/", "/examples/"],
          exclude: ["/about/", "/sponsor/", "/partners/"]
        },
        categories: {
          essentials: ["essentials", "quick-start", "introduction"],
          components: ["component", "props", "events", "slots"],
          reactivity: ["reactivity", "reactive", "ref", "computed"],
          composition_api: ["composition", "setup", "composables"],
          best_practices: ["performance", "production", "ssr"]
        },
        rate_limit: 0.5
      },
      {
        type: "github",
        repo: "vuejs/core",
        enable_codebase_analysis: true,
        code_analysis_depth: "deep",
        fetch_issues: true,
        max_issues: 100,
        fetch_changelog: true,
        fetch_releases: true,
        file_patterns: [
          "packages/reactivity/src/**/*.ts",
          "packages/runtime-core/src/**/*.ts",
          "packages/compiler-core/src/**/*.ts"
        ]
      }
    ]
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
          Paste your unified config JSON below to validate it before submitting. Supports documentation, GitHub, and PDF sources.
        </p>

        {/* Helper Banner */}
        <div className="mb-4 p-4 bg-brand-primary/10 border border-brand-primary/30 rounded-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📝</span>
              <div>
                <p className="text-sm font-medium text-dark-text-primary mb-1">
                  Need a starting point?
                </p>
                <p className="text-xs text-dark-text-secondary">
                  Load an example config or browse 27+ presets from the gallery
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={loadExample}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-secondary text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 text-sm"
              >
                <span>📄</span>
                Load Example
              </button>
              <a
                href="#config-gallery"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-dark-bg hover:bg-dark-border border border-dark-border text-dark-text-primary hover:text-white font-medium rounded-lg transition-colors text-sm"
              >
                <span>🎨</span>
                Browse Gallery
              </a>
            </div>
          </div>
        </div>

        {/* Textarea */}
        <div className="mb-4">
          <label className="text-sm font-medium text-dark-text-primary mb-2 block">
            Config JSON
          </label>
          <textarea
            value={configJson}
            onChange={(e) => {
              setConfigJson(e.target.value);
              setErrors([]);
              setIsValid(false);
            }}
            placeholder='Paste your config JSON here, or click "Load Example" above...'
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
            <li>Click "Load Example" to see a real production config (Vue.js)</li>
            <li>Paste your own config JSON or modify the example</li>
            <li>Click "Validate Config" to check for errors</li>
            <li>Fix any validation errors if needed</li>
            <li>Click "🚀 Submit Config" - that's it!</li>
            <li>Track the review status via the GitHub Issue link</li>
          </ol>
          <p className="mt-3 text-xs text-dark-text-secondary/70">
            💡 Tip: Browse the <a href="#config-gallery" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-brand-primary hover:text-brand-secondary underline">config gallery above</a> to see 27+ real examples
          </p>
        </div>
      </div>
    </div>
  );
}
