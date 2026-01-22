---
title: 基于 Git 的配置源
description: 使用私有或团队 git 仓库存储抓取配置的完整指南，支持身份验证、版本控制和团队协作
section: reference
order: 5
---

# 基于 Git 的配置源

**使用私有或团队 git 仓库存储和共享抓取配置。**

## 概述

基于 Git 的配置源允许您：
- **在 git 仓库中存储配置**（私有或团队仓库）
- **对配置进行版本控制**（跟踪更改、回滚、分支）
- **与团队共享配置**（集中配置管理）
- **使用身份验证**（HTTPS + 令牌、SSH 密钥）
- **自动获取更新**（在抓取之前拉取最新配置）

**版本：** v2.2.0+（Git 配置源功能）

---

## 快速开始

### 1. 添加 Git 源

```bash
# 将 git 仓库添加为配置源
skill-seekers add-git-source \
  https://github.com/your-org/scraping-configs.git \
  --name company-configs \
  --branch main

# 使用身份验证（私有仓库）
skill-seekers add-git-source \
  https://github.com/your-org/private-configs.git \
  --name private-configs \
  --token ghp_yourPersonalAccessToken
```

### 2. 使用来自 Git 源的配置

```bash
# 通过源名称 + 路径引用配置
skill-seekers scrape \
  --config git:company-configs:configs/react.json

# 或使用简写（自动检测）
skill-seekers scrape --config company-configs:react.json
```

### 3. 列出并管理源

```bash
# 列出所有已配置的源
skill-seekers list-git-sources

# 获取最新更新
skill-seekers fetch-git-sources

# 删除源
skill-seekers remove-git-source company-configs
```

---

## 添加 Git 源

### 使用令牌的 HTTPS（推荐用于私有仓库）

```bash
# GitHub 个人访问令牌
skill-seekers add-git-source \
  https://github.com/your-org/configs.git \
  --name my-configs \
  --token ghp_abc123... \
  --branch main

# GitLab 个人访问令牌
skill-seekers add-git-source \
  https://gitlab.com/your-org/configs.git \
  --name gitlab-configs \
  --token glpat-abc123... \
  --branch main

# Bitbucket 应用密码
skill-seekers add-git-source \
  https://bitbucket.org/your-org/configs.git \
  --name bitbucket-configs \
  --token ATBB...abc123 \
  --branch main
```

### SSH 密钥（替代方案）

```bash
# 使用 SSH URL（需要 SSH 密钥设置）
skill-seekers add-git-source \
  git@github.com:your-org/configs.git \
  --name ssh-configs \
  --branch main

# SSH 密钥自动从 ~/.ssh/id_rsa 读取
```

### 公共仓库（无需身份验证）

```bash
# 公共仓库（不需要令牌）
skill-seekers add-git-source \
  https://github.com/public-org/public-configs.git \
  --name public-configs \
  --branch main
```

---

## 配置仓库结构

### 推荐布局

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

### 示例配置文件

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

## 使用 Git 配置

### 完整路径语法

```bash
# 显式语法
skill-seekers scrape --config git:SOURCE_NAME:PATH/TO/CONFIG.json
```

**示例：**
```bash
# 来自 company-configs 源的 React 配置
skill-seekers scrape --config git:company-configs:configs/frontend/react.json

# 内部文档配置
skill-seekers scrape --config git:company-configs:configs/internal/company-docs.json
```

### 简写语法

```bash
# 自动检测 git 源
skill-seekers scrape --config SOURCE_NAME:PATH/TO/CONFIG.json
```

**示例：**
```bash
# 与 git:company-configs:configs/frontend/react.json 相同
skill-seekers scrape --config company-configs:configs/frontend/react.json

# 如果配置在根目录，甚至更短
skill-seekers scrape --config company-configs:react.json
```

### 相对路径

```bash
# 从 configs/ 目录
skill-seekers scrape --config company-configs:frontend/react.json

# 从根目录
skill-seekers scrape --config company-configs:configs/frontend/react.json
```

---

## 管理 Git 源

### 列出源

```bash
# 显示所有已配置的源
skill-seekers list-git-sources

# 输出：
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

### 获取更新

```bash
# 获取所有源
skill-seekers fetch-git-sources

# 获取特定源
skill-seekers fetch-git-sources company-configs

# 在每次抓取之前获取（自动）
skill-seekers scrape --config company-configs:react.json --fetch-sources
```

### 删除源

```bash
# 删除 git 源（保留本地缓存）
skill-seekers remove-git-source company-configs

# 删除并删除本地缓存
skill-seekers remove-git-source company-configs --delete-cache
```

---

## 身份验证

### GitHub 个人访问令牌

**创建令牌：**
1. 访问 https://github.com/settings/tokens
2. 点击 **Generate new token (classic)**
3. 选择范围：`repo`（用于私有仓库）或 `public_repo`（用于公共仓库）
4. 复制令牌（以 `ghp_` 开头）

**添加源：**
```bash
skill-seekers add-git-source \
  https://github.com/your-org/configs.git \
  --name github-configs \
  --token ghp_abc123...
```

### GitLab 个人访问令牌

**创建令牌：**
1. 访问 https://gitlab.com/-/profile/personal_access_tokens
2. 创建具有 `read_repository` 范围的令牌
3. 复制令牌（以 `glpat-` 开头）

**添加源：**
```bash
skill-seekers add-git-source \
  https://gitlab.com/your-org/configs.git \
  --name gitlab-configs \
  --token glpat-abc123...
```

### Bitbucket 应用密码

**创建应用密码：**
1. 访问 https://bitbucket.org/account/settings/app-passwords/
2. 创建具有 `Repositories: Read` 权限的密码
3. 复制密码（以 `ATBB` 开头）

**添加源：**
```bash
skill-seekers add-git-source \
  https://bitbucket.org/your-org/configs.git \
  --name bitbucket-configs \
  --token ATBB...abc123
```

### SSH 密钥

**设置 SSH 密钥：**
```bash
# 生成 SSH 密钥（如果您没有）
ssh-keygen -t ed25519 -C "your_email@example.com"

# 将公钥添加到 GitHub/GitLab/Bitbucket
cat ~/.ssh/id_ed25519.pub
```

**添加源：**
```bash
skill-seekers add-git-source \
  git@github.com:your-org/configs.git \
  --name ssh-configs
```

---

## 分支和版本控制

### 使用不同分支

```bash
# 生产配置
skill-seekers add-git-source \
  https://github.com/your-org/configs.git \
  --name prod-configs \
  --branch production

# 开发配置
skill-seekers add-git-source \
  https://github.com/your-org/configs.git \
  --name dev-configs \
  --branch development

# 使用生产配置
skill-seekers scrape --config prod-configs:react.json

# 使用开发配置
skill-seekers scrape --config dev-configs:react.json
```

### 固定到特定提交/标签

```bash
# 使用特定提交 SHA
skill-seekers add-git-source \
  https://github.com/your-org/configs.git \
  --name pinned-configs \
  --commit abc123def456

# 使用特定标签
skill-seekers add-git-source \
  https://github.com/your-org/configs.git \
  --name tagged-configs \
  --tag v1.2.0
```

---

## 团队协作

### 共享团队仓库

**设置（每个团队一次）：**

```bash
# 1. 为团队配置创建 git 仓库
mkdir scraping-configs
cd scraping-configs
git init
mkdir -p configs/{frontend,backend,internal}

# 2. 添加配置
# （在 configs/ 中创建 JSON 文件）

# 3. 推送到团队仓库
git add .
git commit -m "Initial team configs"
git remote add origin https://github.com/your-org/scraping-configs.git
git push -u origin main
```

**团队成员（每个人）：**

```bash
# 添加团队源
skill-seekers add-git-source \
  https://github.com/your-org/scraping-configs.git \
  --name team-configs \
  --token ghp_teamToken...

# 使用团队配置
skill-seekers scrape --config team-configs:frontend/react.json
```

### 配置更新

**当有人更新配置时：**

```bash
# 选项 1：手动获取
skill-seekers fetch-git-sources team-configs

# 选项 2：抓取前自动获取
skill-seekers scrape --config team-configs:react.json --fetch-sources
```

**贡献新配置：**

```bash
# 1. 克隆团队仓库
git clone https://github.com/your-org/scraping-configs.git
cd scraping-configs

# 2. 创建新配置
cat > configs/backend/new-framework.json <<EOF
{
  "name": "new-framework",
  "base_url": "https://new-framework.dev/",
  ...
}
EOF

# 3. 提交并推送
git add configs/backend/new-framework.json
git commit -m "Add new-framework config"
git push origin main

# 4. 团队成员获取更新
skill-seekers fetch-git-sources team-configs
```

---

## 环境特定配置

### 开发、预发布、生产

**仓库结构：**
```
scraping-configs/
├── envs/
│   ├── dev/
│   │   └── company-docs.json      # 开发文档 URL
│   ├── staging/
│   │   └── company-docs.json      # 预发布文档 URL
│   └── production/
│       └── company-docs.json      # 生产文档 URL
```

**设置源：**
```bash
# 开发环境
skill-seekers add-git-source \
  https://github.com/company/configs.git \
  --name dev-configs \
  --branch development

# 预发布环境
skill-seekers add-git-source \
  https://github.com/company/configs.git \
  --name staging-configs \
  --branch staging

# 生产环境
skill-seekers add-git-source \
  https://github.com/company/configs.git \
  --name prod-configs \
  --branch production
```

**使用：**
```bash
# 在开发环境中
skill-seekers scrape --config dev-configs:envs/dev/company-docs.json

# 在生产环境中
skill-seekers scrape --config prod-configs:envs/production/company-docs.json
```

---

## MCP 集成

### Git 源的 MCP 工具

**可用工具：**

1. **`add_git_source`** - 将 git 仓库添加为配置源
2. **`list_git_sources`** - 列出所有已配置的源
3. **`remove_git_source`** - 删除源
4. **`fetch_git_sources`** - 从远程获取更新

### 在 Claude Desktop 中使用

**示例对话：**

```
您：添加我们公司的抓取配置仓库

Claude：我会添加 git 源。

[Claude 调用 add_git_source MCP 工具]
{
  "url": "https://github.com/company/scraping-configs.git",
  "name": "company-configs",
  "token": "ghp_...",
  "branch": "main"
}

完成！您现在可以使用以下配置：
skill-seekers scrape --config company-configs:PATH/TO/CONFIG.json
```

**列出源：**

```
您：我配置了哪些 git 源？

Claude：[Claude 调用 list_git_sources]

您有 2 个 git 源：
1. company-configs (https://github.com/company/configs.git)
2. team-configs (https://github.com/team/configs.git)
```

---

## 存储和缓存

### 本地存储

Git 源克隆到：
```bash
~/.skill-seekers/git-sources/SOURCE_NAME/
```

**示例：**
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

### 缓存行为

**自动获取行为：**
- **默认情况下：** Git 源在添加时获取一次
- **手动获取：** `skill-seekers fetch-git-sources`
- **自动获取：** `skill-seekers scrape --config X --fetch-sources`
- **缓存失效：** 每 24 小时获取更新（可配置）

**配置：**
```bash
# 设置自动获取间隔（小时）
skill-seekers config set git_fetch_interval 6  # 每 6 小时获取一次

# 禁用自动获取
skill-seekers config set git_auto_fetch false

# 在抓取前始终获取
skill-seekers config set git_always_fetch true
```

---

## 最佳实践

### 1. 使用描述性源名称

```bash
# ✅ 好
skill-seekers add-git-source URL --name company-internal-configs
skill-seekers add-git-source URL --name team-frontend-configs

# ❌ 差
skill-seekers add-git-source URL --name configs1
skill-seekers add-git-source URL --name source
```

### 2. 分层组织配置

```
configs/
├── internal/          # 公司内部文档
├── external/          # 外部/开源文档
├── production/        # 生产配置
└── experimental/      # 实验/测试配置
```

### 3. 对所有内容进行版本控制

```bash
# 添加 .gitignore
cat > .gitignore <<EOF
*.log
*.tmp
.DS_Store
EOF

# 跟踪更改
git add configs/
git commit -m "Update React config: increase max_pages to 300"
```

### 4. 为环境使用分支

```bash
# main - 生产配置
# staging - 预发布配置
# development - 开发配置
# feature/* - 实验配置
```

### 5. 记录您的配置

```markdown
# README.md

## 配置仓库结构

- `configs/frontend/` - 前端框架配置
- `configs/backend/` - 后端框架配置
- `configs/internal/` - 内部公司文档

## 用法

```bash
skill-seekers scrape --config team-configs:frontend/react.json
```

## 贡献

1. 创建功能分支
2. 添加/更新配置
3. 使用 `skill-seekers validate` 测试
4. 创建 PR
```

---

## 故障排除

### 问题：身份验证失败

**症状：**
```
Error: Failed to clone repository
Authentication failed for 'https://github.com/org/configs.git'
```

**解决方案：**
1. **验证令牌是否有效：**
   - GitHub: https://github.com/settings/tokens
   - GitLab: https://gitlab.com/-/profile/personal_access_tokens
2. **检查令牌权限：**
   - GitHub: 需要 `repo` 或 `public_repo` 范围
   - GitLab: 需要 `read_repository` 范围
3. **使用正确的令牌重新添加源：**
   ```bash
   skill-seekers remove-git-source SOURCE_NAME
   skill-seekers add-git-source URL --name SOURCE_NAME --token CORRECT_TOKEN
   ```

### 问题：找不到配置

**症状：**
```
Error: Config file not found: git:source:path/to/config.json
```

**解决方案：**
1. **列出源内容：**
   ```bash
   ls ~/.skill-seekers/git-sources/SOURCE_NAME/
   ```
2. **获取最新更新：**
   ```bash
   skill-seekers fetch-git-sources SOURCE_NAME
   ```
3. **使用正确的路径：**
   ```bash
   # 如果配置在：configs/frontend/react.json
   skill-seekers scrape --config SOURCE_NAME:configs/frontend/react.json
   ```

### 问题：源落后于远程

**症状：**
```
⚠️ Source 'company-configs' is behind remote by 5 commits
```

**解决方案：**
```bash
# 获取更新
skill-seekers fetch-git-sources company-configs

# 或在抓取前自动获取
skill-seekers scrape --config company-configs:react.json --fetch-sources
```

### 问题：找不到 SSH 密钥

**症状：**
```
Error: Could not read from remote repository
Permission denied (publickey)
```

**解决方案：**
1. **生成 SSH 密钥：**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```
2. **将公钥添加到 GitHub：**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   # 复制输出并添加到 https://github.com/settings/keys
   ```
3. **测试 SSH 连接：**
   ```bash
   ssh -T git@github.com
   ```

---

## 配置文件

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

## 下一步

- [MCP 设置指南](/zh/docs/guides/mcp-setup) - 安装带有 git 源工具的 MCP 集成
- [CLI 参考](/zh/docs/cli/scrape) - 文档抓取命令
- [统一抓取](/zh/docs/features/unified-scraping) - 使用 git 配置进行多源抓取

---

**状态**：✅ 生产就绪（v2.2.0+）

发现问题或有建议？[打开 issue](https://github.com/yusufkaraaslan/Skill_Seekers/issues)
