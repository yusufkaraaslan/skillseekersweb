import type { Config } from '../../utils/types';
import { getDownloadUrl } from '../../utils/api';

interface ConfigCardProps {
  config: Config;
  viewMode: 'grid' | 'list';
  onViewDetails: (config: Config) => void;
}

export default function ConfigCard({ config, viewMode, onViewDetails }: ConfigCardProps) {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(getDownloadUrl(config.name), '_blank');
  };

  if (viewMode === 'list') {
    return (
      <div
        className="group flex items-center justify-between border-b border-dark-border bg-dark-surface px-6 py-4 transition-colors hover:bg-dark-border cursor-pointer"
        onClick={() => onViewDetails(config)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-dark-text-primary group-hover:text-brand-primary transition-colors">
              {config.name}
            </h3>
            <span
              className={`px-2 py-1 text-xs font-medium rounded ${
                config.type === 'unified'
                  ? 'bg-brand-secondary/20 text-brand-secondary'
                  : 'bg-brand-primary/20 text-brand-primary'
              }`}
            >
              {config.type}
            </span>
          </div>
          <p className="text-sm text-dark-text-secondary line-clamp-1 mb-2">
            {config.description}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs px-2 py-1 rounded bg-dark-bg text-dark-text-secondary">
              {config.category}
            </span>
            {config.tags.slice(0, 3).map((tag, idx) => (
              <span key={`${config.config_file}-${tag}-${idx}`} className="text-xs text-dark-text-secondary">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 ml-4">
          <div className="text-right text-sm text-dark-text-secondary">
            <div>{config.max_pages ? `${config.max_pages.toLocaleString()} pages` : 'N/A'}</div>
            <div className="text-xs">
              {new Date(config.last_updated).toLocaleDateString()}
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
          >
            Download
          </button>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div
      className="group relative overflow-hidden rounded-lg border border-dark-border bg-dark-surface p-6 transition-all hover:border-brand-primary hover:shadow-lg hover:shadow-brand-primary/10 cursor-pointer"
      onClick={() => onViewDetails(config)}
    >
      {/* Type badge */}
      <div className="absolute top-4 right-4">
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${
            config.type === 'unified'
              ? 'bg-brand-secondary/20 text-brand-secondary'
              : 'bg-brand-primary/20 text-brand-primary'
          }`}
        >
          {config.type}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-3 text-xl font-semibold text-dark-text-primary group-hover:text-brand-primary transition-colors pr-20">
        {config.name}
      </h3>

      {/* Description */}
      <p className="mb-4 text-sm text-dark-text-secondary line-clamp-3 leading-relaxed">
        {config.description}
      </p>

      {/* Category */}
      <div className="mb-3">
        <span className="inline-block px-3 py-1 text-xs font-medium rounded bg-dark-bg text-dark-text-secondary">
          {config.category}
        </span>
      </div>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-2">
        {config.tags.slice(0, 4).map((tag, idx) => (
          <span key={`${config.config_file}-${tag}-${idx}`} className="text-xs text-dark-text-secondary">
            #{tag}
          </span>
        ))}
        {config.tags.length > 4 && (
          <span className="text-xs text-dark-text-secondary">
            +{config.tags.length - 4} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-dark-border">
        <div className="text-xs text-dark-text-secondary">
          <div>{config.max_pages ? `${config.max_pages.toLocaleString()} pages` : 'N/A'}</div>
          <div>{new Date(config.last_updated).toLocaleDateString()}</div>
        </div>
        <button
          onClick={handleDownload}
          className="rounded-lg bg-gradient-to-r from-brand-primary to-brand-secondary px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          Download
        </button>
      </div>

      {/* Hover gradient effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
    </div>
  );
}
