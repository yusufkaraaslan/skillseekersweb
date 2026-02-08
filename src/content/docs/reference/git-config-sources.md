---
title: Git-Based Config Sources
description: Complete guide to using private or team git repositories for scraping configs with authentication, version control, and team collaboration support
section: reference
order: 5
---

# Git-Based Config Sources

**Use private or team git repositories to store and share scraping configurations.**

## Overview

Git-based config sources allow you to:
- **Store configs in git repositories** (private or team repos)
- **Version control your configs** (track changes, rollback, branches)
- **Share configs with your team** (centralized config management)
- **Use authentication** (HTTPS + token, SSH keys)
- **Auto-fetch updates** (pull latest configs before scraping)

**Version:** v2.2.0+ (Git config sources feature)

---

## Quick Start

### 1. Add a Git Source

```bash
# Add git repository as config source
skill-seekers add-git-source \
  https://github.com/your-org/scraping-configs.git \
  --name company-configs \
  --branch main

# With authentication (private repo)
skill-seekers add-git-source \
  https://github.com/your-org/private-configs.git \
  --name private-configs \
  --token ghp_yourPersonalAccessToken
```

### 2. Use Config from Git Source

```bash
# Reference config by source name + path
skill-seekers scrape \
  --config git:company-configs:configs/react.json

# Or use shorthand (auto-detects)
skill-seekers scrape --config company-configs:react.json
```

### 3. List and Manage Sources

```bash
# List all configured sources
skill-seekers list-git-sources

# Fetch latest updates
skill-seekers fetch-git-sources

# Remove a source
skill-seekers remove-git-source company-configs
```

---

## Adding Git Sources

### HTTPS with Token (Recommended for Private Repos)

```bash
# GitHub personal access token
skill-seekers add-git-source \
  https://github.com/your-org/configs.git \
  --name my-configs \
  --token ghp_abc123... \
  --branch main

# GitLab personal access token
skill-seekers add-git-source \
  https://gitlab.com/your-org/configs.git \
  --name gitlab-configs \
  --token glpat-abc123... \
  --branch main

# Bitbucket app password
skill-seekers add-git-source \
  https://bitbucket.org/your-org/configs.git \
  --name bitbucket-configs \
  --token ATBB...abc123 \
  --branch main
```

### SSH Keys (Alternative)

```bash
# Using SSH URL (requires SSH key setup)
skill-seekers add-git-source \
  git@github.com:your-org/configs.git \
  --name ssh-configs \
  --branch main

# SSH key is read from ~/.ssh/id_rsa automatically
```

### Public Repositories (No Auth)

```bash
# Public repo (no token needed)
skill-seekers add-git-source \
  https://github.com/public-org/public-configs.git \
  --name public-configs \
  --branch main
```

---

## Config Repository Structure

### Recommended Layout

```
scraping-configs/
├── README.md
├── configs/
│   ├── frontend/
│   │   ├── react.json
│   │   ├── vue.json
│   │   └── angular.json
│   ├── backend/
│   │   ├── django.json
│   │   ├── fastapi.json
│   │   └── flask.json
│   ├── game-engines/
│   │   ├── godot.json
│   │   └── unity.json
│   └── internal/
│       ├── company-docs.json
│       └── api-docs.json
├── presets/
│   └── company-preset.json
└── .gitignore
```

### Example Config File

**configs/frontend/react.json:**
```json
{
  "name": "react",
  "description": "React framework documentation",
  "base_url": "https://react.dev/",
  "extract_api": true,
  "max_pages": 200,
  "selectors": {
    "main_content": "article",
    "title": "h1",
    "code_blocks": "pre code"
  },
  "categories": {
    "getting_started": ["learn", "tutorial"],
    "api": ["reference", "api"]
  }
}
```

---

## Using Git Configs

### Full Path Syntax

```bash
# Explicit syntax
skill-seekers scrape --config git:SOURCE_NAME:PATH/TO/CONFIG.json
```

**Examples:**
```bash
# React config from company-configs source
skill-seekers scrape --config git:company-configs:configs/frontend/react.json

# Internal docs config
skill-seekers scrape --config git:company-configs:configs/internal/company-docs.json
```

### Shorthand Syntax

```bash
# Auto-detects git source
skill-seekers scrape --config SOURCE_NAME:PATH/TO/CONFIG.json
```

**Examples:**
```bash
# Same as git:company-configs:configs/frontend/react.json
skill-seekers scrape --config company-configs:configs/frontend/react.json

# Even shorter if config is at root
skill-seekers scrape --config company-configs:react.json
```

### Relative Paths

```bash
# From configs/ directory
skill-seekers scrape --config company-configs:frontend/react.json

# From root
skill-seekers scrape --config company-configs:configs/frontend/react.json
```

---

## Managing Git Sources

### List Sources

```bash
# Show all configured sources
skill-seekers list-git-sources

# Output:
# Name: company-configs
# URL: https://github.com/your-org/scraping-configs.git
# Branch: main
# Status: ✅ Cloned, up-to-date
# Path: ~/.skill-seekers/git-sources/company-configs
#
# Name: gitlab-configs
# URL: https://gitlab.com/your-org/configs.git
# Branch: production
# Status: ⚠️ Behind remote by 3 commits
# Path: ~/.skill-seekers/git-sources/gitlab-configs
```

### Fetch Updates

```bash
# Fetch all sources
skill-seekers fetch-git-sources

# Fetch specific source
skill-seekers fetch-git-sources company-configs

# Fetch before every scrape (automatic)
skill-seekers scrape --config company-configs:react.json --fetch-sources
```

### Remove Source

```bash
# Remove git source (keeps local cache)
skill-seekers remove-git-source company-configs

# Remove and delete local cache
skill-seekers remove-git-source company-configs --delete-cache
```

---

## Authentication

### GitHub Personal Access Token

**Create token:**
1. Go to https://github.com/settings/tokens
2. Click **Generate new token (classic)**
3. Select scopes: `repo` (for private repos) or `public_repo` (for public repos)
4. Copy token (starts with `ghp_`)

**Add source:**
```bash
skill-seekers add-git-source \
  https://github.com/your-org/configs.git \
  --name github-configs \
  --token ghp_abc123...
```

### GitLab Personal Access Token

**Create token:**
1. Go to https://gitlab.com/-/profile/personal_access_tokens
2. Create token with `read_repository` scope
3. Copy token (starts with `glpat-`)

**Add source:**
```bash
skill-seekers add-git-source \
  https://gitlab.com/your-org/configs.git \
  --name gitlab-configs \
  --token glpat-abc123...
```

### Bitbucket App Password

**Create app password:**
1. Go to https://bitbucket.org/account/settings/app-passwords/
2. Create password with `Repositories: Read` permission
3. Copy password (starts with `ATBB`)

**Add source:**
```bash
skill-seekers add-git-source \
  https://bitbucket.org/your-org/configs.git \
  --name bitbucket-configs \
  --token ATBB...abc123
```

### SSH Keys

**Setup SSH key:**
```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add public key to GitHub/GitLab/Bitbucket
cat ~/.ssh/id_ed25519.pub
```

**Add source:**
```bash
skill-seekers add-git-source \
  git@github.com:your-org/configs.git \
  --name ssh-configs
```

---

## Branching and Versioning

### Use Different Branches

```bash
# Production configs
skill-seekers add-git-source \
  https://github.com/your-org/configs.git \
  --name prod-configs \
  --branch production

# Development configs
skill-seekers add-git-source \
  https://github.com/your-org/configs.git \
  --name dev-configs \
  --branch development

# Use production config
skill-seekers scrape --config prod-configs:react.json

# Use development config
skill-seekers scrape --config dev-configs:react.json
```

### Pin to Specific Commit/Tag

```bash
# Use specific commit SHA
skill-seekers add-git-source \
  https://github.com/your-org/configs.git \
  --name pinned-configs \
  --commit abc123def456

# Use specific tag
skill-seekers add-git-source \
  https://github.com/your-org/configs.git \
  --name tagged-configs \
  --tag v1.2.0
```

---

## Team Collaboration

### Shared Team Repository

**Setup (once per team):**

```bash
# 1. Create git repository for team configs
mkdir scraping-configs
cd scraping-configs
git init
mkdir -p configs/{frontend,backend,internal}

# 2. Add configs
# (create JSON files in configs/)

# 3. Push to team repo
git add .
git commit -m "Initial team configs"
git remote add origin https://github.com/your-org/scraping-configs.git
git push -u origin main
```

**Team Members (each person):**

```bash
# Add team source
skill-seekers add-git-source \
  https://github.com/your-org/scraping-configs.git \
  --name team-configs \
  --token ghp_teamToken...

# Use team configs
skill-seekers scrape --config team-configs:frontend/react.json
```

### Config Updates

**When someone updates configs:**

```bash
# Option 1: Manual fetch
skill-seekers fetch-git-sources team-configs

# Option 2: Auto-fetch before scrape
skill-seekers scrape --config team-configs:react.json --fetch-sources
```

**Contribute new config:**

```bash
# 1. Clone team repo
git clone https://github.com/your-org/scraping-configs.git
cd scraping-configs

# 2. Create new config
cat > configs/backend/new-framework.json <<EOF
{
  "name": "new-framework",
  "base_url": "https://new-framework.dev/",
  ...
}
EOF

# 3. Commit and push
git add configs/backend/new-framework.json
git commit -m "Add new-framework config"
git push origin main

# 4. Team members fetch updates
skill-seekers fetch-git-sources team-configs
```

---

## Environment-Specific Configs

### Dev, Staging, Production

**Repository structure:**
```
scraping-configs/
├── envs/
│   ├── dev/
│   │   └── company-docs.json      # Dev docs URL
│   ├── staging/
│   │   └── company-docs.json      # Staging docs URL
│   └── production/
│       └── company-docs.json      # Production docs URL
```

**Setup sources:**
```bash
# Dev environment
skill-seekers add-git-source \
  https://github.com/company/configs.git \
  --name dev-configs \
  --branch development

# Staging environment
skill-seekers add-git-source \
  https://github.com/company/configs.git \
  --name staging-configs \
  --branch staging

# Production environment
skill-seekers add-git-source \
  https://github.com/company/configs.git \
  --name prod-configs \
  --branch production
```

**Use:**
```bash
# In dev environment
skill-seekers scrape --config dev-configs:envs/dev/company-docs.json

# In production environment
skill-seekers scrape --config prod-configs:envs/production/company-docs.json
```

---

## MCP Integration

### MCP Tools for Git Sources

**Available tools:**

1. **`add_git_source`** - Add git repository as config source
2. **`list_git_sources`** - List all configured sources
3. **`remove_git_source`** - Remove source
4. **`fetch_git_sources`** - Fetch updates from remote

### Using in Claude Desktop

**Example conversation:**

```
You: Add our company's scraping configs repository

Claude: I'll add the git source.

[Claude calls add_git_source MCP tool]
{
  "url": "https://github.com/company/scraping-configs.git",
  "name": "company-configs",
  "token": "ghp_...",
  "branch": "main"
}

Done! You can now use configs with:
skill-seekers scrape --config company-configs:PATH/TO/CONFIG.json
```

**List sources:**

```
You: What git sources do I have configured?

Claude: [Claude calls list_git_sources]

You have 2 git sources:
1. company-configs (https://github.com/company/configs.git)
2. team-configs (https://github.com/team/configs.git)
```

---

## Storage and Caching

### Local Storage

Git sources are cloned to:
```bash
~/.skill-seekers/git-sources/SOURCE_NAME/
```

**Example:**
```bash
~/.skill-seekers/git-sources/
├── company-configs/
│   ├── .git/
│   ├── configs/
│   └── README.md
└── team-configs/
    ├── .git/
    └── configs/
```

### Cache Behavior

**Auto-fetch behavior:**
- **By default:** Git sources are fetched once when added
- **Manual fetch:** `skill-seekers fetch-git-sources`
- **Auto-fetch:** `skill-seekers scrape --config X --fetch-sources`
- **Cache invalidation:** Fetch updates every 24 hours (configurable)

**Configuration:**
```bash
# Set auto-fetch interval (hours)
skill-seekers config set git_fetch_interval 6  # Fetch every 6 hours

# Disable auto-fetch
skill-seekers config set git_auto_fetch false

# Always fetch before scraping
skill-seekers config set git_always_fetch true
```

---

## Best Practices

### 1. Use Descriptive Source Names

```bash
# ✅ Good
skill-seekers add-git-source URL --name company-internal-configs
skill-seekers add-git-source URL --name team-frontend-configs

# ❌ Bad
skill-seekers add-git-source URL --name configs1
skill-seekers add-git-source URL --name source
```

### 2. Organize Configs Hierarchically

```
configs/
├── internal/          # Company-internal docs
├── external/          # External/open-source docs
├── production/        # Production configs
└── experimental/      # Experimental/test configs
```

### 3. Version Control Everything

```bash
# Add .gitignore
cat > .gitignore <<EOF
*.log
*.tmp
.DS_Store
EOF

# Track changes
git add configs/
git commit -m "Update React config: increase max_pages to 300"
```

### 4. Use Branches for Environments

```bash
# main - production configs
# staging - staging configs
# development - dev configs
# feature/* - experimental configs
```

### 5. Document Your Configs

```markdown
# README.md

## Config Repository Structure

- `configs/frontend/` - Frontend framework configs
- `configs/backend/` - Backend framework configs
- `configs/internal/` - Internal company documentation

## Usage

```bash
skill-seekers scrape --config team-configs:frontend/react.json
```

## Contributing

1. Create feature branch
2. Add/update config
3. Test with `skill-seekers validate`
4. Create PR
```

---

## Troubleshooting

### Issue: Authentication failed

**Symptoms:**
```
Error: Failed to clone repository
Authentication failed for 'https://github.com/org/configs.git'
```

**Solutions:**
1. **Verify token is valid:**
   - GitHub: https://github.com/settings/tokens
   - GitLab: https://gitlab.com/-/profile/personal_access_tokens
2. **Check token permissions:**
   - GitHub: Needs `repo` or `public_repo` scope
   - GitLab: Needs `read_repository` scope
3. **Re-add source with correct token:**
   ```bash
   skill-seekers remove-git-source SOURCE_NAME
   skill-seekers add-git-source URL --name SOURCE_NAME --token CORRECT_TOKEN
   ```

### Issue: Config not found

**Symptoms:**
```
Error: Config file not found: git:source:path/to/config.json
```

**Solutions:**
1. **List source contents:**
   ```bash
   ls ~/.skill-seekers/git-sources/SOURCE_NAME/
   ```
2. **Fetch latest updates:**
   ```bash
   skill-seekers fetch-git-sources SOURCE_NAME
   ```
3. **Use correct path:**
   ```bash
   # If config is at: configs/frontend/react.json
   skill-seekers scrape --config SOURCE_NAME:configs/frontend/react.json
   ```

### Issue: Source behind remote

**Symptoms:**
```
⚠️ Source 'company-configs' is behind remote by 5 commits
```

**Solutions:**
```bash
# Fetch updates
skill-seekers fetch-git-sources company-configs

# Or auto-fetch before scraping
skill-seekers scrape --config company-configs:react.json --fetch-sources
```

### Issue: SSH key not found

**Symptoms:**
```
Error: Could not read from remote repository
Permission denied (publickey)
```

**Solutions:**
1. **Generate SSH key:**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```
2. **Add public key to GitHub:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   # Copy output and add to https://github.com/settings/keys
   ```
3. **Test SSH connection:**
   ```bash
   ssh -T git@github.com
   ```

---

## Configuration File

### ~/.skill-seekers/git-sources.json

```json
{
  "sources": [
    {
      "name": "company-configs",
      "url": "https://github.com/company/configs.git",
      "branch": "main",
      "auth_method": "token",
      "local_path": "~/.skill-seekers/git-sources/company-configs",
      "last_fetch": "2025-01-14T10:30:00Z",
      "status": "up-to-date"
    },
    {
      "name": "team-configs",
      "url": "git@github.com:team/configs.git",
      "branch": "production",
      "auth_method": "ssh",
      "local_path": "~/.skill-seekers/git-sources/team-configs",
      "last_fetch": "2025-01-14T09:15:00Z",
      "status": "behind"
    }
  ],
  "settings": {
    "auto_fetch": true,
    "fetch_interval_hours": 24,
    "always_fetch": false
  }
}
```

---

## Next Steps

- [MCP Setup Guide](/docs/guides/mcp-setup) - Install MCP integration with git source tools
- [CLI Reference](/docs/cli/scrape) - Documentation scraping commands
- [Unified Scraping](/docs/manual/scraping/unified-scraping) - Multi-source scraping with git configs

---

**Status**: ✅ Production Ready (v2.2.0+)

Found an issue or have suggestions? [Open an issue](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
