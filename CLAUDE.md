# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Starts Vite development server
- **Build**: `npm run build` - Creates production build using Vite
- **Preview**: `npm run preview` - Preview production build locally
- **Install dependencies**: `npm install`

For local development without build process, serve files with `npx serve` due to CORS restrictions with ES modules.

## Architecture Overview

This is a React + TypeScript SEO analysis tool that uses Google Gemini API to analyze web pages. The application follows a simple client-side architecture:

### Core Structure
- **App.tsx**: Main application component with form handling and state management
- **services/geminiService.ts**: Google Gemini API integration with structured schema validation
- **types.ts**: TypeScript definitions for SEO analysis results
- **components/**: Reusable UI components (Button, Input, Loader, ResultCard, icons)

### Key Technical Details
- Uses Vite as build tool with React JSX transform
- Tailwind CSS for styling (dark theme design)
- Google Gemini 2.5-flash model for SEO analysis
- Structured API responses using `responseSchema` for consistent JSON output
- Environment variable handling: `GEMINI_API_KEY` → `process.env.API_KEY`

### API Integration Pattern
The Gemini service uses a strict response schema to ensure consistent JSON output with these analysis categories:
- Title tag analysis (length, keyword presence)
- Meta description analysis  
- H1 tag structure
- Image alt attribute coverage
- Word count assessment
- Keyword placement summary

Each analysis returns status ('good'|'bad'|'warning'|'neutral') and recommendations.

### Local Development Setup
API key configuration is handled differently for development vs production:
- Production: Set `GEMINI_API_KEY` environment variable
- Local development: Modify `index.html` with window.process.env.API_KEY (never commit)
- Vite config maps `GEMINI_API_KEY` → `process.env.API_KEY`

### Deployment (Vercel)
For Vercel deployment, you must:
1. Set `GEMINI_API_KEY` environment variable in Vercel dashboard
2. Ensure proper build with `npm run build` 
3. Files now properly configured for production:
   - Tailwind CSS v4 with PostCSS plugin (`@tailwindcss/postcss`)
   - Favicon and CSS files created
   - Vite React plugin configured