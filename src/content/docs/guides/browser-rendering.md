---
title: Browser Rendering for SPA Sites
description: Use Playwright-based browser rendering to scrape JavaScript SPA sites like React, Vue, and Angular documentation
section: guides
order: 5
---

# Browser Rendering for SPA Sites

Many modern documentation sites are JavaScript Single Page Applications (SPAs) that return empty HTML shells. Skill Seekers v3.5.0 includes a Playwright-based browser renderer to handle these sites.

## When to Use

Use browser rendering when:
- A site returns "No scraped data found" despite successful navigation
- The site is built with React, Vue, Angular, or similar SPA frameworks
- Content is loaded dynamically via JavaScript

## Quick Start

```bash
# Install browser dependencies
pip install "skill-seekers[browser]"

# Scrape with browser rendering
skill-seekers create https://spa-docs-site.com --browser

# Or in config:
# Set "browser": true in your JSON config
```

## How It Works

1. When `--browser` flag is set, `DocScraper.scrape_page()` delegates to `BrowserRenderer.render_page(url)`
2. Chromium is auto-installed on first use via Playwright
3. Navigation uses `wait_until='networkidle'` to let JavaScript execute
4. The fully-rendered HTML is returned to the normal pipeline
5. BeautifulSoup extraction and content processing continue as normal

## Smart SPA Discovery (v3.5.0)

The three-layer discovery engine finds pages even on SPAs:
1. **sitemap.xml** — Standard sitemap discovery
2. **llms.txt** — AI-optimized documentation format
3. **SPA nav rendering** — Renders the navigation and discovers links from the DOM

## Config Support

```json
{
  "name": "my-spa-docs",
  "browser": true,
  "start_urls": ["https://spa-docs-site.com/docs"]
}
```

Default browser timeouts: 60 seconds, `domcontentloaded` wait condition.
