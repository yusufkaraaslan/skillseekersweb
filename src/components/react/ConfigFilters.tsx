import type { FilterOptions } from '../../utils/types';

interface ConfigFiltersProps {
  categories: string[];
  tags: string[];
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export default function ConfigFilters({ categories, tags, filters, onFilterChange }: ConfigFiltersProps) {
  const handleCategoryChange = (category: string) => {
    onFilterChange({ ...filters, category: category === 'all' ? undefined : category });
  };

  const handleTypeChange = (type: 'single-source' | 'unified' | 'all') => {
    onFilterChange({ ...filters, type: type === 'all' ? undefined : type });
  };

  const handleTagToggle = (tag: string) => {
    onFilterChange({ ...filters, tag: filters.tag === tag ? undefined : tag });
  };

  return (
    <div className="space-y-6 rounded-lg border border-dark-border bg-dark-surface p-6">
      {/* Category Filter */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-dark-text-primary">Category</h3>
        <select
          value={filters.category || 'all'}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-2 text-dark-text-primary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-colors"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Type Filter */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-dark-text-primary">Type</h3>
        <div className="space-y-2">
          {(['all', 'single-source', 'unified'] as const).map((type) => (
            <label key={type} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="type"
                value={type}
                checked={type === 'all' ? !filters.type : filters.type === type}
                onChange={() => handleTypeChange(type)}
                className="h-4 w-4 border-dark-border bg-dark-bg text-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:ring-offset-0"
              />
              <span className="ml-3 text-sm text-dark-text-secondary group-hover:text-dark-text-primary transition-colors">
                {type === 'all' ? 'All Types' : type === 'single-source' ? 'Single Source' : 'Unified'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Tag Filter */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-dark-text-primary">Tags</h3>
        <div className="flex flex-wrap gap-2 max-h-64 overflow-y-auto">
          {tags.slice(0, 20).map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                filters.tag === tag
                  ? 'bg-brand-primary text-white'
                  : 'bg-dark-bg text-dark-text-secondary hover:bg-dark-border hover:text-dark-text-primary'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(filters.category || filters.type || filters.tag || filters.search) && (
        <button
          onClick={() => onFilterChange({})}
          className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-2 text-sm font-medium text-dark-text-primary hover:bg-dark-border hover:border-brand-primary transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}
