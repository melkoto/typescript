import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import globals from 'globals'

const tsFiles = ['**/*.{ts,tsx,mts,cts}']
const jsFiles = ['**/*.{js,mjs,cjs}']
const textFiles = ['**/*.{css,md,json}']
const __dirname = new URL('.', import.meta.url).pathname

export default tseslint.config(
  /* 0. ignore */
  { ignores: ['dist/**', 'node_modules/**', 'eslint.config.js'] },

  /* 1. JavaScript */
  {
    ...eslint.configs.recommended,
    files: jsFiles,
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },

  /* 2. Type‑checked TypeScript — разворачиваем массив */
  ...tseslint.configs.recommendedTypeChecked,

  /* 3. Наши доп‑правила для TS */
  {
    files: tsFiles,
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: false }],
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
    },
  },

  /* 4. Prettier */
  {
    files: [...jsFiles, ...tsFiles, ...textFiles],
    plugins: { prettier: prettierPlugin },
    rules: { 'prettier/prettier': 'error' },
  }
)
