import { useState } from 'react';
import { useTranslations } from '../../i18n/useTranslations';
import type { SupportedLanguage } from '../../i18n/utils';

interface FeatureMatrixProps {
  lang: SupportedLanguage;
}

export default function FeatureMatrix({ lang }: FeatureMatrixProps) {
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations(lang);

  // Show first 12 features initially
  const displayedFeatures = expanded ? t.features.items : t.features.items.slice(0, 12);
  const hiddenCount = t.features.items.length - 12;

  return (
    <section className="py-20 bg-dark-bg relative overflow-hidden" id="feature-matrix">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-ocean-500/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-dark-text-primary">
            {t.features.title}
          </h2>
          <p className="text-xl text-dark-text-secondary">
            {t.features.subtitle}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="group p-6 bg-dark-surface border border-dark-border rounded-2xl hover:border-ocean-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-ocean-500/10 hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-ocean-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-ocean-500/10 flex items-center justify-center text-3xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {feature.icon}
                  </div>

                  {/* Category Badge */}
                  <span className="inline-block px-2.5 py-1 mb-3 text-xs font-medium rounded-full bg-ocean-500/10 text-ocean-500 border border-ocean-500/20">
                    {feature.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-ocean-500 transition-colors text-dark-text-primary">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-dark-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Expand/Collapse Button */}
          {!expanded && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setExpanded(true)}
                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-ocean-600 to-ocean-500 text-white font-semibold rounded-xl shadow-lg shadow-ocean-500/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-ocean-500/40"
              >
                <span>{t.features.viewAll.replace('{count}', t.features.items.length.toString())}</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <p className="mt-3 text-sm text-dark-text-secondary">
                {t.features.moreFeatures.replace('{count}', hiddenCount.toString())}
              </p>
            </div>
          )}

          {expanded && (
            <div className="mt-12 text-center">
              <button
                onClick={() => {
                  setExpanded(false);
                  // Scroll back to feature matrix top
                  document.getElementById('feature-matrix')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex items-center space-x-3 px-8 py-4 bg-dark-surface border border-dark-border hover:border-ocean-500 text-dark-text-secondary hover:text-ocean-500 font-semibold rounded-xl transition-all duration-300"
              >
                <span>{t.features.showLess}</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-dark-text-secondary mb-6">
            {t.features.cta.question}
          </p>
          <a
            href="/docs/getting-started/quick-start"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-ocean-600 to-ocean-500 text-white font-semibold rounded-xl shadow-lg shadow-ocean-500/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-ocean-500/40"
          >
            <span>{t.features.cta.button}</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
