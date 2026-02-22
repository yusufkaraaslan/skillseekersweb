import { useEffect } from 'react';
import type { Config } from '../../utils/types';
import { getDownloadUrl } from '../../utils/api';

interface ConfigDetailModalProps {
  config: Config | null;
  onClose: () => void;
}

export default function ConfigDetailModal({ config, onClose }: ConfigDetailModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

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

  const typeColor = config.type === 'unified'
    ? 'bg-[#A855F7]/20 text-[#A855F7]'
    : 'bg-[#00A3E0]/20 text-[#00A3E0]';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-[#1F1F29] bg-[#13131A] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-[#1F1F29] bg-[#13131A] p-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {config.name}
              </h2>
              <span className={`px-3 py-1 text-xs font-medium rounded ${typeColor}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                {config.type}
              </span>
            </div>
            <p className="text-sm text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>{config.description}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 rounded-lg p-2 text-[#94A3B8] hover:bg-[#1F1F29] hover:text-white transition-colors"
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
            <div className="rounded-lg border border-[#1F1F29] bg-[#0A0A0F] p-4">
              <div className="text-xs text-[#64748B] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Category</div>
              <div className="text-sm font-medium text-white" style={{ fontFamily: 'Inter, sans-serif' }}>{config.category}</div>
            </div>
            <div className="rounded-lg border border-[#1F1F29] bg-[#0A0A0F] p-4">
              <div className="text-xs text-[#64748B] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Primary Source</div>
              <div className="text-sm font-medium text-white truncate" title={config.primary_source} style={{ fontFamily: 'Inter, sans-serif' }}>
                {config.primary_source}
              </div>
            </div>
            <div className="rounded-lg border border-[#1F1F29] bg-[#0A0A0F] p-4">
              <div className="text-xs text-[#64748B] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Max Pages</div>
              <div className="text-sm font-medium text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                {config.max_pages ? config.max_pages.toLocaleString() : 'N/A'}
              </div>
            </div>
            <div className="rounded-lg border border-[#1F1F29] bg-[#0A0A0F] p-4">
              <div className="text-xs text-[#64748B] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>File Size</div>
              <div className="text-sm font-medium text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                {(config.file_size / 1024).toFixed(2)} KB
              </div>
            </div>
            <div className="rounded-lg border border-[#1F1F29] bg-[#0A0A0F] p-4 md:col-span-2">
              <div className="text-xs text-[#64748B] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Last Updated</div>
              <div className="text-sm font-medium text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                {new Date(config.last_updated).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Tags</h3>
            <div className="flex flex-wrap gap-2">
              {config.tags.map((tag, idx) => (
                <span
                  key={`${config.config_file}-tag-${idx}`}
                  className="rounded-full bg-[#0A0A0F] px-3 py-1 text-xs font-medium text-[#94A3B8] border border-[#1F1F29]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* JSON Preview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Configuration JSON</h3>
              <button
                onClick={copyConfigJson}
                className="rounded-lg px-3 py-1 text-xs font-medium text-[#94A3B8] hover:bg-[#1F1F29] hover:text-white transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Copy JSON
              </button>
            </div>
            <pre 
              className="rounded-lg border border-[#1F1F29] bg-[#0A0A0F] p-4 text-xs text-[#94A3B8] overflow-x-auto"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {JSON.stringify(config, null, 2)}
            </pre>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDownload}
              className="flex-1 rounded-lg bg-gradient-to-r from-[#00A3E0] to-[#00D4AA] px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Download Config
            </button>
            <a
              href={config.primary_source}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg border border-[#1F1F29] bg-[#0A0A0F] px-6 py-3 text-sm font-semibold text-white text-center transition-all hover:bg-[#1F1F29]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              View Source
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
