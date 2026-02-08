---
title: "使用 Skill Seekers 让 Cursor 掌握完整的框架知识"
description: "如何将文档、仓库、PDF 或代码库转换为 Cursor AI 规则，以获得更好的代码补全和理解"
pubDate: 2026-02-14
author: "Skill Seekers 团队"
authorTwitter: "@skillseekers"
tags: ["cursor", "ai-coding", "教程", "windsurf", "cline"]
---

# 让 Cursor 掌握完整的框架知识

## 问题所在

Cursor 默认不知道您框架的 API。您得到的建议很通用，没有利用框架特定的模式和最佳实践。

## 解决方案

使用 Skill Seekers v3.0.0 将任何源转换为 `.cursorrules`：

```bash
# 从文档
skill-seekers scrape --target claude --config react.json
cp output/react-claude/.cursorrules ./

# 从 GitHub 仓库
skill-seekers scrape --target claude --github https://github.com/facebook/react
cp output/react-claude/.cursorrules ./

# 从本地代码库
skill-seekers analyze --directory ./my-project --target claude
cp output/my-project-claude/.cursorrules ./
```

## 工作原理

1. **提取**自文档、仓库、PDF 或代码库
2. **转换**为 Claude 兼容格式
3. **复制** `.cursorrules` 到您的项目
4. **享受**框架感知的 AI 建议

## 支持的 AI 编码助手

| 工具 | 命令 | 文件 | 适用于 |
|------|------|------|--------|
| **Cursor** | `--target claude` | `.cursorrules` | 文档、仓库、代码库 |
| **Windsurf** | `--target claude` | `.windsurfrules` | 文档、仓库、代码库 |
| **Cline** | `--target claude` | `.clinerules` | 文档、仓库、代码库 |
| **Continue.dev** | `--target claude` | `.continuerules` | 文档、仓库、代码库 |

## 真实示例：从 GitHub 获取 React

### 之前（通用建议）

```javascript
// Cursor 建议通用函数
function handleClick() {
  // 通用建议...
}
```

### 之后（从真实代码获取 React 感知）

```javascript
// Cursor 从实际的 React 仓库了解 React 模式
function Counter() {
  const [count, setCount] = useState(0);  // 建议使用 useState
  
  useEffect(() => {  // 建议对副作用使用 useEffect
    document.title = `Count: ${count}`;
    return () => {  // 建议清理
      document.title = 'My App';
    };
  }, [count]);
  
  return (
    <button onClick={() => setCount(c => c + 1)}>  // 了解回调模式
      Count: {count}
    </button>
  );
}
```

## 快速开始

```bash
# 1. 安装 Skill Seekers
pip install skill-seekers

# 2. 从任何源提取
skill-seekers scrape --target claude --config configs/react.json
# 或从 GitHub
skill-seekers scrape --target claude --github https://github.com/owner/repo
# 或从本地代码
skill-seekers analyze --directory ./my-project --target claude

# 3. 复制规则文件
cp output/*-claude/.cursorrules ./

# 4. 重启 Cursor
# 您的 AI 现在了解该框架了！
```

## 创建自定义配置

对于没有预设的源：

```json
{
  "name": "my-framework",
  "url": "https://docs.myframework.com",
  "target": "claude",
  "selectors": {
    "content": "article.main-content",
    "title": "h1",
    "code": "pre code"
  }
}
```

然后：
```bash
skill-seekers scrape --config my-framework.json --target claude
```

## 最佳实践技巧

1. **使用真实代码** - GitHub 仓库比单独文档提供更好的示例
2. **保持规则更新** - 框架更改时重新抓取
3. **组合源** - 合并文档 + 仓库规则以获得全面知识
4. **项目特定** - 在顶部添加您自己的 `.cursorrules`
5. **版本控制** - 将 `.cursorrules` 提交到仓库

## 结果

- ✅ 更好的代码补全
- ✅ 框架感知建议
- ✅ 从真实代码识别模式
- ✅ 最佳实践提醒

立即转换您的 AI 编码体验！
