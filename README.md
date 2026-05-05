# Hamzah Portfolio

A personal portfolio website built with React, TypeScript, and Vite.

This project showcases my skills, projects, journey, and contact information in a clean, responsive single-page layout.

## Features

- Interactive portfolio sections: About, Skills, Projects, Journey, Contact
- Animated skill visuals and section transitions
- Responsive layout for desktop and mobile
- Styled using reusable React components and inline styles

## Tech stack

- React
- TypeScript
- Vite
- ESLint

## Run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project structure

- `src/components` — reusable UI blocks and page sections
- `src/constants` — data used across the site
- `src/hooks` — custom React hooks
- `src/styles` — shared style values
- `src/types` — TypeScript interfaces and types

## Notes

Feel free to customize the content, update the skills section, or add new projects to keep the portfolio current.

````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
````
