import { useEffect, useState } from 'react';

interface ConfigSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function ConfigSearch({ onSearch, placeholder = 'Search configurations...' }: ConfigSearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Debounce search with 300ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className={`relative group ${isFocused ? 'scale-[1.02]' : ''} transition-transform duration-200`}>
      {/* Glow effect on focus */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-ocean-500 to-ocean-600 rounded-xl opacity-0 blur transition-opacity duration-300 ${isFocused ? 'opacity-30' : 'group-hover:opacity-20'}`}></div>
      
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            className={`h-5 w-5 transition-colors duration-200 ${isFocused ? 'text-ocean-400' : 'text-dark-text-secondary'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-dark-border bg-dark-surface/80 backdrop-blur-sm px-4 py-4 pl-12 pr-12 text-dark-text-primary placeholder-dark-text-secondary/70 focus:border-ocean-500 focus:outline-none focus:ring-2 focus:ring-ocean-500/20 transition-all duration-200 shadow-lg shadow-black/5"
        />
        
        {/* Clear button */}
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-dark-text-secondary hover:text-dark-text-primary transition-colors"
          >
            <div className="p-1 rounded-full hover:bg-dark-border transition-colors">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </button>
        )}
        
        {/* Keyboard shortcut hint */}
        {!query && !isFocused && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-medium text-dark-text-secondary bg-dark-bg border border-dark-border rounded">
              ⌘K
            </kbd>
          </div>
        )}
      </div>
    </div>
  );
}
