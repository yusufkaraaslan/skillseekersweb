import { useState } from 'react';
import { useTranslations } from '../../i18n/useTranslations';
import type { SupportedLanguage } from '../../i18n/utils';

interface FeatureMatrixProps {
  lang: SupportedLanguage;
}

export default function FeatureMatrix({ lang }: FeatureMatrixProps) {
  const [expanded, setExpanded] = useState(false);
  const t = useTranslations(lang);

  // Show first 9 features initially
  const displayedFeatures = expanded ? t.features.items : t.features.items.slice(0, 9);
  const hiddenCount = t.features.items.length - 9;

  return (
    <section className="py-20 bg-dark-bg" id="feature-matrix">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
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
                className="group p-6 bg-dark-surface border border-dark-border rounded-xl hover:border-brand-primary transition-all duration-300 hover:shadow-lg hover:shadow-brand-primary/10 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  {feature.icon}
                </div>

                {/* Category Badge */}
                <span className="inline-block px-2 py-1 mb-3 text-xs font-medium rounded-full bg-brand-primary/10 text-brand-primary">
                  {feature.category}
                </span>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 group-hover:text-brand-primary transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-dark-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Expand/Collapse Button */}
          {!expanded && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setExpanded(true)}
                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg shadow-lg shadow-brand-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-brand-primary/60"
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
                className="inline-flex items-center space-x-3 px-8 py-4 bg-dark-surface border border-dark-border hover:border-brand-primary text-dark-text-secondary hover:text-brand-primary font-semibold rounded-lg transition-all duration-300"
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
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg shadow-lg shadow-brand-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-brand-primary/60"
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
