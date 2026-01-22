import { useState, useEffect } from 'react';
import { languages, type SupportedLanguage } from '../../i18n/utils';

interface LanguageSwitcherProps {
  currentLang: SupportedLanguage;
  currentPath: string;
}

export default function LanguageSwitcher({ currentLang, currentPath }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.language-switcher')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const getLocalizedPath = (lang: SupportedLanguage) => {
    // Remove existing language prefix if present
    let path = currentPath;
    Object.keys(languages).forEach((l) => {
      if (path.startsWith(`/${l}/`)) {
        path = path.substring(3); // Remove /xx/
      } else if (path === `/${l}`) {
        path = '/';
      }
    });

    // Add new language prefix (except for default language 'en')
    if (lang === 'en') {
      return path || '/';
    }
    return `/${lang}${path}`;
  };

  return (
    <div className="language-switcher relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 rounded-lg border border-dark-border bg-dark-surface/50 backdrop-blur-sm px-3 py-2 text-sm font-medium text-dark-text-primary transition-all duration-200 hover:bg-dark-surface hover:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary"
        aria-label="Switch language"
        aria-expanded={isOpen}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
        <span>{languages[currentLang]}</span>
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-lg border border-dark-border bg-dark-surface shadow-lg overflow-hidden z-50">
          {(Object.keys(languages) as SupportedLanguage[]).map((lang) => (
            <a
              key={lang}
              href={getLocalizedPath(lang)}
              className={`block px-4 py-2 text-sm transition-colors ${
                lang === currentLang
                  ? 'bg-brand-primary/10 text-brand-primary font-medium'
                  : 'text-dark-text-primary hover:bg-dark-surface/80'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {languages[lang]}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
