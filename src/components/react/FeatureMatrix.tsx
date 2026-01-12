import { useState } from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
  category: string;
}

const allFeatures: Feature[] = [
  // Key features (shown initially)
  {
    icon: '🌐',
    title: 'Multi-Source Scraping',
    description: 'Extract from documentation websites, GitHub repositories, and PDF files',
    category: 'Data Sources',
  },
  {
    icon: '✨',
    title: 'AI Enhancement',
    description: 'Automatically add explanations, examples, and best practices using Claude',
    category: 'AI Features',
  },
  {
    icon: '🤖',
    title: '4 LLM Platforms',
    description: 'Deploy to Claude Projects, Gemini, OpenAI, or export as Markdown',
    category: 'Platform Support',
  },
  {
    icon: '📦',
    title: '24 Preset Configs',
    description: 'Ready-to-use configs for popular frameworks (React, Vue, Django, etc.)',
    category: 'Configuration',
  },
  {
    icon: '🔧',
    title: 'MCP Integration',
    description: 'Built-in Model Context Protocol support with 27+ tools',
    category: 'Integration',
  },
  {
    icon: '✅',
    title: '700+ Tests',
    description: 'Production-ready with comprehensive test coverage and validation',
    category: 'Quality',
  },
  {
    icon: '⚡',
    title: 'Zero Manual Work',
    description: 'Fully automated pipeline from source to production-ready skill',
    category: 'Automation',
  },
  {
    icon: '⏱️',
    title: '20-40 Minutes',
    description: 'Complete skill generation in under an hour, including AI enhancement',
    category: 'Performance',
  },

  // Additional features (hidden initially)
  {
    icon: '🎯',
    title: 'URL Pattern Filtering',
    description: 'Include/exclude specific paths with regex pattern matching',
    category: 'Configuration',
  },
  {
    icon: '🚦',
    title: 'Rate Limiting',
    description: 'Control scraping speed to respect server resources (0.1-5 req/sec)',
    category: 'Configuration',
  },
  {
    icon: '🔍',
    title: 'Custom CSS Selectors',
    description: 'Define precise selectors for main content, titles, and code blocks',
    category: 'Customization',
  },
  {
    icon: '⚙️',
    title: 'Async Mode',
    description: 'Parallel scraping with configurable concurrency (up to 50 workers)',
    category: 'Performance',
  },
  {
    icon: '📚',
    title: 'Large Docs Support',
    description: 'Handle massive documentation sites with intelligent pagination',
    category: 'Data Sources',
  },
  {
    icon: '🧠',
    title: 'Smart Chunking',
    description: 'Automatic content splitting optimized for LLM context windows',
    category: 'AI Features',
  },
  {
    icon: '🔬',
    title: 'GitHub AST Analysis',
    description: 'Deep code analysis using Abstract Syntax Trees for repos',
    category: 'Data Sources',
  },
  {
    icon: '📄',
    title: 'PDF OCR',
    description: 'Extract text from scanned PDFs with OCR fallback',
    category: 'Data Sources',
  },
  {
    icon: '💬',
    title: 'Custom Prompts',
    description: 'Customize AI enhancement prompts for specific use cases',
    category: 'AI Features',
  },
  {
    icon: '🔒',
    title: 'GitHub Auth',
    description: 'Support for private repositories with GitHub token authentication',
    category: 'Integration',
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    description: 'Real-time progress bars and status updates during scraping',
    category: 'UX',
  },
  {
    icon: '🎨',
    title: 'Markdown Export',
    description: 'Export skills as portable Markdown files for any platform',
    category: 'Platform Support',
  },
  {
    icon: '🔄',
    title: 'Incremental Updates',
    description: 'Re-scrape only changed pages to keep skills up-to-date',
    category: 'Automation',
  },
  {
    icon: '🛡️',
    title: 'Error Recovery',
    description: 'Automatic retry with exponential backoff for failed requests',
    category: 'Quality',
  },
];

export default function FeatureMatrix() {
  const [expanded, setExpanded] = useState(false);

  // Show first 8 features initially
  const displayedFeatures = expanded ? allFeatures : allFeatures.slice(0, 8);
  const hiddenCount = allFeatures.length - 8;

  return (
    <section className="py-20 bg-dark-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Comprehensive Feature Set
          </h2>
          <p className="text-xl text-dark-text-secondary">
            Everything you need to transform documentation into production-ready AI skills
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
                <span>View All {allFeatures.length} Features</span>
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <p className="mt-3 text-sm text-dark-text-secondary">
                +{hiddenCount} more features
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
                <span>Show Less</span>
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
            Ready to transform your documentation?
          </p>
          <a
            href="/docs/getting-started/quick-start"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-semibold rounded-lg shadow-lg shadow-brand-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-brand-primary/60"
          >
            <span>Get Started Now</span>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
