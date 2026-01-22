import en from './translations/en.json';
import zh from './translations/zh.json';

export const languages = {
  en: 'English',
  zh: '中文',
};

export const defaultLang = 'en';

export const translations = {
  en,
  zh,
} as const;

export type SupportedLanguage = keyof typeof translations;

/**
 * Get translation value by key path (e.g., "hero.headline.part1")
 */
export function getTranslation(
  lang: SupportedLanguage,
  keyPath: string
): string {
  const keys = keyPath.split('.');
  let value: any = translations[lang];

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      // Fallback to English if translation not found
      value = translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return keyPath; // Return key path if not found
        }
      }
      break;
    }
  }

  return typeof value === 'string' ? value : keyPath;
}

/**
 * Get all translations for a specific language
 */
export function getTranslations(lang: SupportedLanguage) {
  return translations[lang] || translations.en;
}

/**
 * Check if a language is supported
 */
export function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return lang in translations;
}

/**
 * Get language from URL path (e.g., /zh/docs -> zh)
 */
export function getLangFromUrl(url: URL): SupportedLanguage {
  const [, lang] = url.pathname.split('/');
  if (lang && isSupportedLanguage(lang)) {
    return lang;
  }
  return defaultLang;
}

/**
 * Create a localized path
 */
export function useTranslatedPath(lang: SupportedLanguage) {
  return function translatePath(path: string, targetLang: string = lang) {
    if (targetLang === defaultLang) {
      return path;
    }
    return `/${targetLang}${path}`;
  };
}
