# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.
**Important**: This project communicates in Chinese. Please prioritize using Chinese for code comments and documentation.

## Commands

```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Architecture

- **Framework**: Vue 3.5+ with Composition API (`<script setup>`)
- **Build Tool**: Vite 6.2+
- **Router**: Vue Router 4.5+
- **Path Alias**: `@` resolves to `./src`

## Project Structure

```
src/
  main.js          # App entry point
  App.vue          # Root component
  components/      # Vue components
```

## Rules

Read `.claude/rules/ImplementationBoundary_zh.md` before implementing features - it defines strict boundaries on scope control, blocking protocols, and communication requirements.
