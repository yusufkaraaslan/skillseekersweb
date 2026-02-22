import type { ViewMode } from '../../utils/types';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export default function ViewToggle({ viewMode, onViewModeChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-[#1F1F29] bg-[#13131A] p-1">
      <button
        onClick={() => onViewModeChange('grid')}
        className={`rounded px-3 py-2 text-sm font-medium transition-colors ${
          viewMode === 'grid'
            ? 'bg-[#00A3E0] text-white'
            : 'text-[#94A3B8] hover:text-white'
        }`}
        title="Grid view"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      </button>
      <button
        onClick={() => onViewModeChange('list')}
        className={`rounded px-3 py-2 text-sm font-medium transition-colors ${
          viewMode === 'list'
            ? 'bg-[#00A3E0] text-white'
            : 'text-[#94A3B8] hover:text-white'
        }`}
        title="List view"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
}
