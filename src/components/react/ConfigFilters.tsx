import { useState } from 'react';
import type { FilterOptions } from '../../utils/types';

interface ConfigFiltersProps {
  categories: string[];
  tags: string[];
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

export default function ConfigFilters({ 
  tags, 
  filters, 
  onFilterChange, 
  onClear,
  hasActiveFilters 
}: ConfigFiltersProps) {
  const [showAllTags, setShowAllTags] = useState(false);

  const handleTypeChange = (type: 'single-source' | 'unified' | 'all') => {
    onFilterChange({ ...filters, type: type === 'all' ? undefined : type });
  };

  const handleTagToggle = (tag: string) => {
    onFilterChange({ ...filters, tag: filters.tag === tag ? undefined : tag });
  };

  const displayedTags = showAllTags ? tags : tags.slice(0, 15);
  const hasMoreTags = tags.length > 15;

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-dark-text-primary flex items-center gap-2">
          <svg className="h-5 w-5 text-ocean-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-xs text-ocean-500 hover:text-ocean-400 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="rounded-xl border border-dark-border bg-dark-surface p-5 space-y-6">
        {/* Type Filter */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-dark-text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-ocean-500"></span>
            Type
          </h3>
          <div className="space-y-2">
            {(['all', 'single-source', 'unified'] as const).map((type) => (
              <label 
                key={type} 
                className={`flex items-center cursor-pointer group p-2 rounded-lg transition-colors ${
                  (type === 'all' ? !filters.type : filters.type === type) 
                    ? 'bg-ocean-500/10' 
                    : 'hover:bg-dark-bg'
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={type === 'all' ? !filters.type : filters.type === type}
                  onChange={() => handleTypeChange(type)}
                  className="h-4 w-4 border-dark-border bg-dark-bg text-ocean-500 focus:ring-2 focus:ring-ocean-500/20 focus:ring-offset-0"
                />
                <span className={`ml-3 text-sm transition-colors ${
                  (type === 'all' ? !filters.type : filters.type === type)
                    ? 'text-dark-text-primary font-medium'
                    : 'text-dark-text-secondary group-hover:text-dark-text-primary'
                }`}>
                  {type === 'all' ? (
                    <span className="flex items-center gap-2">📦 All Types</span>
                  ) : type === 'single-source' ? (
                    <span className="flex items-center gap-2">📄 Single Source</span>
                  ) : (
                    <span className="flex items-center gap-2">🔗 Unified</span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-dark-border"></div>

        {/* Tag Filter */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-dark-text-primary flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            Tags
            <span className="text-xs text-dark-text-secondary font-normal">
              ({tags.length})
            </span>
          </h3>
          <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto custom-scrollbar">
            {displayedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                  filters.tag === tag
                    ? 'bg-ocean-500 text-white shadow-md shadow-ocean-500/25'
                    : 'bg-dark-bg text-dark-text-secondary border border-dark-border hover:border-ocean-500/50 hover:text-dark-text-primary'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
          
          {/* Show more/less */}
          {hasMoreTags && (
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="mt-3 w-full py-2 text-xs text-ocean-500 hover:text-ocean-400 font-medium rounded-lg border border-ocean-500/30 hover:bg-ocean-500/10 transition-all flex items-center justify-center gap-1"
            >
              {showAllTags ? (
                <>
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  Show less
                </>
              ) : (
                <>
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Show {tags.length - 15} more
                </>
              )}
            </button>
          )}
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <>
            <div className="border-t border-dark-border"></div>
            <div className="bg-ocean-500/10 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-dark-text-primary mb-2">Active Filters</h3>
              <div className="space-y-2 text-xs">
                {filters.type && (
                  <div className="flex items-center justify-between">
                    <span className="text-dark-text-secondary">Type:</span>
                    <span className="text-ocean-400 font-medium">{filters.type}</span>
                  </div>
                )}
                {filters.tag && (
                  <div className="flex items-center justify-between">
                    <span className="text-dark-text-secondary">Tag:</span>
                    <span className="text-ocean-400 font-medium">#{filters.tag}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Help Card */}
      <div className="rounded-xl border border-dark-border bg-dark-surface p-5">
        <h3 className="text-sm font-semibold text-dark-text-primary mb-3 flex items-center gap-2">
          <span className="text-lg">💡</span>
          Need help?
        </h3>
        <p className="text-xs text-dark-text-secondary mb-4">
          Learn how to create and submit your own configurations.
        </p>
        <a
          href="/docs/guides/submit-config"
          className="block w-full text-center rounded-lg bg-dark-bg border border-dark-border hover:border-ocean-500/50 px-4 py-2 text-sm font-medium text-dark-text-primary transition-all"
        >
          View Guide
        </a>
      </div>
    </div>
  );
}
