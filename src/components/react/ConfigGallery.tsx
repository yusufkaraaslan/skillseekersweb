import { useState, useMemo } from 'react';
import type { Config, ViewMode } from '../../utils/types';
import ConfigCard from './ConfigCard';
import ConfigDetailModal from './ConfigDetailModal';
import ViewToggle from './ViewToggle';

interface ConfigGalleryProps {
  initialConfigs: Config[];
}

type SortOption = 'newest' | 'name' | 'popular';

// Category icons
const categoryIcons: Record<string, string> = {
  'Web Framework': '🌐',
  'Mobile': '📱',
  'Database': '🗄️',
  'AI/ML': '🤖',
  'DevOps': '⚙️',
  'Language': '💻',
  'Tool': '🛠️',
  'Library': '📦',
  'CSS': '🎨',
  'Testing': '🧪',
  'Documentation': '📚',
  'Cloud': '☁️',
};

function getCategoryIcon(category: string): string {
  return categoryIcons[category] || '📋';
}

function isNewConfig(lastUpdated: string): boolean {
  const configDate = new Date(lastUpdated);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  return configDate > thirtyDaysAgo;
}

export default function ConfigGallery({ initialConfigs }: ConfigGalleryProps) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedConfig, setSelectedConfig] = useState<Config | null>(null);

  // Get unique categories
  const categories = useMemo(() => {
    const set = new Set(initialConfigs.map(c => c.category));
    return Array.from(set).sort();
  }, [initialConfigs]);

  // New/Featured configs
  const newConfigs = useMemo(() => {
    const recent = initialConfigs.filter(c => isNewConfig(c.last_updated));
    if (recent.length > 0) {
      return recent.sort((a, b) => new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime()).slice(0, 4);
    }
    return initialConfigs.slice(0, 4);
  }, [initialConfigs]);

  // Filter and sort main configs
  const filteredConfigs = useMemo(() => {
    let configs = initialConfigs;

    if (search) {
      const query = search.toLowerCase();
      configs = configs.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    if (categoryFilter !== 'all') {
      configs = configs.filter(c => c.category === categoryFilter);
    }

    if (typeFilter !== 'all') {
      configs = configs.filter(c => c.type === typeFilter);
    }

    switch (sortBy) {
      case 'name':
        configs = [...configs].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        configs = [...configs].sort((a, b) => 
          new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime()
        );
        break;
    }

    return configs;
  }, [initialConfigs, search, categoryFilter, typeFilter, sortBy]);

  const hasFilters = search || categoryFilter !== 'all' || typeFilter !== 'all';

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      {/* Clean Header with Space Grotesk */}
      <div className="border-b border-[#1F1F29] bg-[#13131A]/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 
            className="text-4xl sm:text-5xl font-bold text-center mb-4 text-white"
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Config Gallery
          </h1>
          <p className="text-center text-[#94A3B8] text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            {initialConfigs.length} ready-to-use configurations for Skill Seekers
          </p>

          {/* Simple Search */}
          <div className="max-w-xl mx-auto relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search configs..."
              className="w-full bg-[#0A0A0F] border border-[#1F1F29] rounded-xl px-5 py-4 pl-12 text-white placeholder-[#64748B] focus:border-[#00A3E0] focus:outline-none focus:ring-2 focus:ring-[#00A3E0]/20 transition-all"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#64748B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Featured/New Configs Section */}
      {!hasFilters && newConfigs.length > 0 && (
        <div className="bg-gradient-to-r from-[#00A3E0]/10 via-[#00D4AA]/10 to-[#00A3E0]/10 border-b border-[#1F1F29]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-3 mb-6">
              {initialConfigs.some(c => isNewConfig(c.last_updated)) ? (
                <>
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4AA] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00D4AA]"></span>
                  </span>
                  <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    New This Month
                  </h2>
                </>
              ) : (
                <>
                  <span className="text-2xl">⭐</span>
                  <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                    Featured
                  </h2>
                </>
              )}
              <span className="text-sm text-[#94A3B8] bg-[#13131A] px-3 py-1 rounded-full border border-[#1F1F29]">
                {newConfigs.length} configs
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {newConfigs.map(config => (
                <div
                  key={`new-${config.config_file}`}
                  onClick={() => setSelectedConfig(config)}
                  className="group bg-[#13131A] border border-[#00A3E0]/30 rounded-xl p-4 cursor-pointer hover:border-[#00A3E0]/60 transition-all hover:shadow-lg hover:shadow-[#00A3E0]/10"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getCategoryIcon(config.category)}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white group-hover:text-[#00A3E0] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {config.name}
                      </h3>
                      <p className="text-sm text-[#94A3B8] line-clamp-2 mt-1">
                        {config.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    {isNewConfig(config.last_updated) ? (
                      <span className="text-xs px-2 py-1 bg-[#00D4AA]/20 text-[#00D4AA] rounded">
                        NEW
                      </span>
                    ) : (
                      <span className="text-xs text-[#64748B]">
                        {config.type}
                      </span>
                    )}
                    <span className="text-xs text-[#64748B]">
                      {new Date(config.last_updated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Single Filter Bar */}
      <div className="border-b border-[#1F1F29] bg-[#13131A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#0A0A0F] border border-[#1F1F29] rounded-lg px-4 py-2 text-sm text-white focus:border-[#00A3E0] focus:outline-none transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <option value="all" className="bg-[#13131A] text-white">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat} className="bg-[#13131A] text-white">{getCategoryIcon(cat)} {cat}</option>
              ))}
            </select>

            {/* Type Filter */}
            <div className="flex items-center bg-[#0A0A0F] rounded-lg border border-[#1F1F29] p-1">
              {(['all', 'single-source', 'unified'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    typeFilter === type
                      ? 'bg-[#00A3E0] text-white'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {type === 'all' ? 'All Types' : type === 'single-source' ? 'Single' : 'Unified'}
                </button>
              ))}
            </div>

            <div className="flex-1"></div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-[#0A0A0F] border border-[#1F1F29] rounded-lg px-4 py-2 text-sm text-white focus:border-[#00A3E0] focus:outline-none transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <option value="newest" className="bg-[#13131A] text-white">Newest</option>
              <option value="name" className="bg-[#13131A] text-white">Name A-Z</option>
              <option value="popular" className="bg-[#13131A] text-white">Popular</option>
            </select>

            <ViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>

          {/* Results count */}
          <div className="mt-3 text-sm text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Showing <span className="text-white font-medium">{filteredConfigs.length}</span> of <span className="text-white font-medium">{initialConfigs.length}</span> configs
            {search && ` matching "${search}"`}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredConfigs.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
              : 'flex flex-col gap-3'
          }>
            {filteredConfigs.map(config => (
              <ConfigCard
                key={config.config_file}
                config={config}
                viewMode={viewMode}
                onViewDetails={setSelectedConfig}
                categoryIcon={getCategoryIcon(config.category)}
                isNew={isNewConfig(config.last_updated)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              No configs found
            </h3>
            <p className="text-[#94A3B8] mb-6">Try adjusting your filters</p>
            <button
              onClick={() => { setSearch(''); setCategoryFilter('all'); setTypeFilter('all'); }}
              className="px-6 py-3 bg-[#00A3E0] text-white rounded-lg hover:bg-[#00A3E0]/90 transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <ConfigDetailModal config={selectedConfig} onClose={() => setSelectedConfig(null)} />
    </div>
  );
}
