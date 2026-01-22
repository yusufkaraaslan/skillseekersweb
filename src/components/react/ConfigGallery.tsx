import { useState, useMemo, useCallback } from 'react';
import type { Config, FilterOptions, ViewMode } from '../../utils/types';
import { filterConfigs, extractUniqueTags } from '../../utils/api';
import ConfigSearch from './ConfigSearch';
import ConfigFilters from './ConfigFilters';
import ConfigCard from './ConfigCard';
import ConfigDetailModal from './ConfigDetailModal';
import ViewToggle from './ViewToggle';
import { useTranslations } from '../../i18n/useTranslations';
import type { SupportedLanguage } from '../../i18n/utils';

interface ConfigGalleryProps {
  initialConfigs: Config[];
  lang?: SupportedLanguage;
}

export default function ConfigGallery({ initialConfigs, lang = 'en' }: ConfigGalleryProps) {
  const t = useTranslations(lang);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedConfig, setSelectedConfig] = useState<Config | null>(null);

  // Extract unique categories and tags
  const categories = useMemo(() => {
    const categorySet = new Set(initialConfigs.map((c) => c.category));
    return Array.from(categorySet).sort();
  }, [initialConfigs]);

  const tags = useMemo(() => extractUniqueTags(initialConfigs), [initialConfigs]);

  // Filter configs based on current filters
  const filteredConfigs = useMemo(() => {
    return filterConfigs(initialConfigs, filters);
  }, [initialConfigs, filters]);

  const handleSearch = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, search: query || undefined }));
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            {t.configs.gallery.heading}
          </h1>
          <p className="text-lg text-dark-text-secondary">
            {t.configs.gallery.subtitle.replace('{count}', String(initialConfigs.length))}
          </p>
        </div>

        {/* Search and View Toggle */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <ConfigSearch onSearch={handleSearch} />
          </div>
          <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <ConfigFilters
              categories={categories}
              tags={tags}
              filters={filters}
              onFilterChange={setFilters}
            />
          </aside>

          {/* Config Grid/List */}
          <main className="flex-1">
            {/* Results Count */}
            <div className="mb-4 text-sm text-dark-text-secondary">
              {t.configs.gallery.showing
                .replace('{filtered}', String(filteredConfigs.length))
                .replace('{total}', String(initialConfigs.length))}
              {filters.search && ` ${t.configs.gallery.searchFor.replace('{query}', filters.search)}`}
            </div>

            {/* Configs */}
            {filteredConfigs.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'flex flex-col gap-4'
                }
              >
                {filteredConfigs.map((config) => (
                  <ConfigCard
                    key={config.config_file}
                    config={config}
                    viewMode={viewMode}
                    onViewDetails={setSelectedConfig}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dark-border bg-dark-surface p-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-dark-text-secondary mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-dark-text-primary mb-2">{t.configs.gallery.noResults.title}</h3>
                <p className="text-sm text-dark-text-secondary mb-4">
                  {t.configs.gallery.noResults.description}
                </p>
                <button
                  onClick={() => setFilters({})}
                  className="rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary/90 transition-colors"
                >
                  {t.configs.gallery.noResults.clearButton}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Detail Modal */}
      <ConfigDetailModal config={selectedConfig} onClose={() => setSelectedConfig(null)} />
    </div>
  );
}
