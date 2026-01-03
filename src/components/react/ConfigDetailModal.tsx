import { useEffect } from 'react';
import type { Config } from '../../utils/types';
import { getDownloadUrl } from '../../utils/api';

interface ConfigDetailModalProps {
  config: Config | null;
  onClose: () => void;
}

export default function ConfigDetailModal({ config, onClose }: ConfigDetailModalProps) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (config) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [config]);

  if (!config) return null;

  const handleDownload = () => {
    window.open(getDownloadUrl(config.name), '_blank');
  };

  const copyConfigJson = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg border border-dark-border bg-dark-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-dark-border bg-dark-surface p-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-dark-text-primary">{config.name}</h2>
              <span
                className={`px-3 py-1 text-xs font-medium rounded ${
                  config.type === 'unified'
                    ? 'bg-brand-secondary/20 text-brand-secondary'
                    : 'bg-brand-primary/20 text-brand-primary'
                }`}
              >
                {config.type}
              </span>
            </div>
            <p className="text-sm text-dark-text-secondary">{config.description}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 rounded-lg p-2 text-dark-text-secondary hover:bg-dark-border hover:text-dark-text-primary transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-dark-border bg-dark-bg p-4">
              <div className="text-xs text-dark-text-secondary mb-1">Category</div>
              <div className="text-sm font-medium text-dark-text-primary">{config.category}</div>
            </div>
            <div className="rounded-lg border border-dark-border bg-dark-bg p-4">
              <div className="text-xs text-dark-text-secondary mb-1">Primary Source</div>
              <div className="text-sm font-medium text-dark-text-primary truncate" title={config.primary_source}>
                {config.primary_source}
              </div>
            </div>
            <div className="rounded-lg border border-dark-border bg-dark-bg p-4">
              <div className="text-xs text-dark-text-secondary mb-1">Max Pages</div>
              <div className="text-sm font-medium text-dark-text-primary">
                {config.max_pages ? config.max_pages.toLocaleString() : 'N/A'}
              </div>
            </div>
            <div className="rounded-lg border border-dark-border bg-dark-bg p-4">
              <div className="text-xs text-dark-text-secondary mb-1">File Size</div>
              <div className="text-sm font-medium text-dark-text-primary">
                {(config.file_size / 1024).toFixed(2)} KB
              </div>
            </div>
            <div className="rounded-lg border border-dark-border bg-dark-bg p-4 md:col-span-2">
              <div className="text-xs text-dark-text-secondary mb-1">Last Updated</div>
              <div className="text-sm font-medium text-dark-text-primary">
                {new Date(config.last_updated).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-sm font-semibold text-dark-text-primary mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {config.tags.map((tag, idx) => (
                <span
                  key={`${config.config_file}-tag-${idx}`}
                  className="rounded-full bg-dark-bg px-3 py-1 text-xs font-medium text-dark-text-secondary border border-dark-border"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* JSON Preview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-dark-text-primary">Configuration JSON</h3>
              <button
                onClick={copyConfigJson}
                className="rounded-lg px-3 py-1 text-xs font-medium text-dark-text-secondary hover:bg-dark-border hover:text-dark-text-primary transition-colors"
              >
                Copy JSON
              </button>
            </div>
            <pre className="rounded-lg border border-dark-border bg-dark-bg p-4 text-xs text-dark-text-secondary overflow-x-auto">
              {JSON.stringify(config, null, 2)}
            </pre>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              Download Config
            </button>
            <a
              href={config.primary_source}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg border border-dark-border bg-dark-bg px-6 py-3 text-sm font-semibold text-dark-text-primary text-center transition-all hover:bg-dark-border hover:border-brand-primary"
            >
              View Source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
