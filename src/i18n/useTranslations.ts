import { useMemo } from 'react';
import { translations, type SupportedLanguage } from './utils';

/**
 * React hook for accessing translations in client-side components
 * @param lang - The language code (en or zh)
 * @returns The translations object for the specified language
 */
export function useTranslations(lang: SupportedLanguage) {
  return useMemo(() => translations[lang], [lang]);
}
