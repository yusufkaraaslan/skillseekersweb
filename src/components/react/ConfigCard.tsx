import type { Config } from '../../utils/types';
import { getDownloadUrl } from '../../utils/api';

interface ConfigCardProps {
  config: Config;
  viewMode: 'grid' | 'list';
  onViewDetails: (config: Config) => void;
  categoryIcon?: string;
  isNew?: boolean;
}

export default function ConfigCard({ 
  config, 
  viewMode, 
  onViewDetails,
  categoryIcon = '📋',
  isNew = false
}: ConfigCardProps) {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(getDownloadUrl(config.name), '_blank');
  };

  const typeColor = config.type === 'unified' 
    ? 'text-[#A855F7] bg-[#A855F7]/10' 
    : 'text-[#00A3E0] bg-[#00A3E0]/10';

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onViewDetails(config)}
        className="group flex items-center gap-4 bg-[#13131A] border border-[#1F1F29] rounded-lg p-4 hover:border-[#00A3E0]/50 cursor-pointer transition-all"
      >
        <span className="text-2xl">{categoryIcon}</span>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-white group-hover:text-[#00A3E0] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
              {config.name}
            </h3>
            {isNew && (
              <span className="text-xs px-2 py-0.5 bg-[#00D4AA]/20 text-[#00D4AA] rounded">NEW</span>
            )}
          </div>
          <p className="text-sm text-[#94A3B8] truncate">{config.description}</p>
        </div>

        <span className={`text-xs px-2 py-1 rounded ${typeColor}`} style={{ fontFamily: 'Inter, sans-serif' }}>
          {config.type}
        </span>

        <button
          onClick={handleDownload}
          className="p-2 text-[#94A3B8] hover:text-[#00A3E0] hover:bg-[#00A3E0]/10 rounded-lg transition-colors"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
    );
  }

  // Grid view
  return (
    <div
      onClick={() => onViewDetails(config)}
      className="group bg-[#13131A] border border-[#1F1F29] rounded-xl p-5 hover:border-[#00A3E0]/50 cursor-pointer transition-all hover:shadow-lg hover:shadow-[#00A3E0]/5"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <span className="text-3xl">{categoryIcon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white group-hover:text-[#00A3E0] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
              {config.name}
            </h3>
            {isNew && (
              <span className="flex-shrink-0 w-2 h-2 bg-[#00D4AA] rounded-full"></span>
            )}
          </div>
          <span className={`text-xs px-2 py-0.5 rounded mt-1 inline-block ${typeColor}`} style={{ fontFamily: 'Inter, sans-serif' }}>
            {config.type}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[#94A3B8] line-clamp-2 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
        {config.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[#1F1F29]">
        <span className="text-xs text-[#64748B]" style={{ fontFamily: 'Inter, sans-serif' }}>{config.category}</span>
        <button
          onClick={handleDownload}
          className="text-[#00A3E0] hover:text-[#00D4AA] text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Download
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
