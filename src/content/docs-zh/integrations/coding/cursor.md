---
title: Cursor
description: 通过 .cursorrules 让 Cursor IDE 掌握完整的框架知识。
section: integrations
subsection: coding
order: 11
---

# Cursor

通过 **`.cursorrules`** 让 **Cursor IDE** 掌握完整的框架知识。

## 快速开始

```bash
# 从文档生成
skill-seekers scrape --target claude --config configs/react.json
cp output/react-claude/.cursorrules ./

# 从 GitHub 仓库生成（更好！）
skill-seekers scrape --target claude --github https://github.com/facebook/react
cp output/react-claude/.cursorrules ./
```

## 设置步骤

1. **生成规则：**
```bash
skill-seekers scrape --config configs/react.json --target claude
```

2. **复制到项目：**
```bash
cp output/react-claude/.cursorrules ./my-project/
```

3. **重启 Cursor** - 规则立即生效

## 你将获得

- ✅ **框架感知建议** - Cursor 了解你的 API
- ✅ **模式识别** - 来自真实代码的最佳实践
- ✅ **上下文帮助** - 聊天中提供相关文档
- ✅ **无 Token 限制** - 完整的框架知识

## 前后对比

### 之前（通用）
```javascript
function handleClick() {
  // 通用建议...
}
```

### 之后（React 感知）
```javascript
function Counter() {
  const [count, setCount] = useState(0);  // 建议使用 useState
  
  useEffect(() => {  // 了解生命周期
    document.title = `Count: ${count}`;
  }, [count]);
  
  return <button onClick={() => setCount(c => c + 1)}>Count</button>;
}
```

## 提示

- **使用 GitHub 仓库** - 真实代码优于文档
- **保持更新** - 框架更新时重新抓取
- **组合来源** - 文档 + GitHub 以获得最佳效果

## 下一步

- [AI 编程指南](/blog/2026-02-14-ai-coding-guide) - 详细教程
- [Windsurf](/docs/integrations/coding/windsurf) - 替代 IDE
