# Saber Agent

Saber Agent 是一个基于 Vue 3 和 Vite 构建的前端项目。

## 技术栈

- **框架**: Vue 3.5+ (Composition API)
- **构建工具**: Vite 6.2+
- **路由**: Vue Router 4.5+
- **语言**: JavaScript

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发

```bash
npm run dev
```

启动开发服务器，支持热更新。

### 构建

```bash
npm run build
```

构建生产版本，输出到 `dist` 目录。

### 预览

```bash
npm run preview
```

本地预览生产构建。

## 项目结构

```
Saber-Agent/
├── src/
│   ├── main.js           # 应用入口
│   ├── App.vue           # 根组件
│   └── components/       # Vue 组件
├── public/               # 静态资源
├── index.html            # HTML 模板
├── vite.config.js        # Vite 配置
└── package.json          # 项目配置
```

## 配置

### 路径别名

项目配置了 `@` 别名指向 `src` 目录：

```js
import App from '@/App.vue'
```

## 开发规范

本项目遵循 [实现边界控制规则](.claude/rules/ImplementationBoundary_zh.md)，核心原则：

- 严格遵守需求，遇阻则问
- 最小可行实现，不做过度设计
- 禁止静默简化或范围变更

## 许可证

MIT
