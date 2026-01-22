#!/usr/bin/env python3
"""
Automated documentation translation script for Skill Seekers website.
Translates English markdown files to Chinese while preserving structure.
"""

import os
import re
from pathlib import Path
from typing import Dict, Tuple

# Translation mappings for common terms
TERM_TRANSLATIONS = {
    # CLI Commands
    "scrape": "抓取",
    "enhance": "增强",
    "package": "打包",
    "upload": "上传",
    "config": "配置",
    "resume": "恢复",

    # Common terms
    "Documentation": "文档",
    "Installation": "安装",
    "Tutorial": "教程",
    "Guide": "指南",
    "Reference": "参考",
    "Overview": "概述",
    "Features": "功能",
    "Usage": "使用",
    "Examples": "示例",
    "Troubleshooting": "故障排除",
    "Configuration": "配置",
    "Setup": "设置",
    "Getting Started": "入门",
    "Quick Start": "快速入门",
    "Advanced": "高级",
    "Best Practices": "最佳实践",
    "Community": "社区",
    "Contributing": "贡献",
    "Changelog": "更新日志",
    "Roadmap": "路线图",

    # Technical terms
    "API": "API",
    "CLI": "CLI",
    "PDF": "PDF",
    "GitHub": "GitHub",
    "Repository": "仓库",
    "Codebase": "代码库",
    "Analysis": "分析",
    "Scraping": "抓取",
    "Enhancement": "增强",
    "Packaging": "打包",
    "Platform": "平台",
    "Multi-Source": "多源",
    "Multi-Platform": "多平台",
}

def extract_frontmatter(content: str) -> Tuple[Dict[str, str], str]:
    """Extract YAML frontmatter and content."""
    if not content.startswith('---\n'):
        return {}, content

    parts = content.split('---\n', 2)
    if len(parts) < 3:
        return {}, content

    frontmatter_text = parts[1]
    body = parts[2]

    frontmatter = {}
    for line in frontmatter_text.strip().split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            frontmatter[key.strip()] = value.strip()

    return frontmatter, body

def translate_frontmatter(frontmatter: Dict[str, str]) -> Dict[str, str]:
    """Translate frontmatter fields."""
    translated = frontmatter.copy()

    # Translate title
    if 'title' in translated:
        title = translated['title']
        for en, zh in TERM_TRANSLATIONS.items():
            title = re.sub(rf'\b{en}\b', zh, title, flags=re.IGNORECASE)
        translated['title'] = title

    # Translate description
    if 'description' in translated:
        desc = translated['description']
        # Basic translation placeholder - in practice, this would use a proper translation API
        translated['description'] = desc  # Keep English for now - manual translation needed

    return translated

def should_translate_file(filepath: Path) -> bool:
    """Check if file should be translated."""
    # Skip already translated files
    zh_path = str(filepath).replace('/docs/', '/docs-zh/')
    return not Path(zh_path).exists()

def get_files_to_translate(docs_dir: Path) -> list:
    """Get list of files that need translation."""
    files = []
    for md_file in docs_dir.rglob('*.md'):
        rel_path = md_file.relative_to(docs_dir)
        # Skip already translated sections
        if str(rel_path).startswith('about/') and str(rel_path) in [
            'about/introduction.md',
            'about/features.md',
            'about/faq.md',
            'about/use-cases.md'
        ]:
            continue
        if str(rel_path) == 'getting-started/overview.md':
            continue
        if str(rel_path) in ['getting-started/installation.md', 'getting-started/first-skill.md']:
            continue  # Already translated

        files.append(md_file)

    return files

def main():
    """Main translation workflow."""
    repo_root = Path(__file__).parent
    docs_dir = repo_root / 'src' / 'content' / 'docs'
    docs_zh_dir = repo_root / 'src' / 'content' / 'docs-zh'

    files_to_translate = get_files_to_translate(docs_dir)

    print(f"Found {len(files_to_translate)} files to translate:")
    for f in sorted(files_to_translate):
        rel_path = f.relative_to(docs_dir)
        print(f"  - {rel_path}")

    print("\nThis script provides a framework for translation.")
    print("For quality translations, each file should be manually translated.")
    print("\nFiles are listed above for reference.")

if __name__ == '__main__':
    main()
