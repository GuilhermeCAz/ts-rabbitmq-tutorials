import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // JavaScript configurations
  eslint.configs.all,

  // TypeScript configurations
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { prettier },
    rules: {
      ...prettier.configs.recommended.rules,
      'prettier/prettier': 'error',
      curly: ['error', 'multi-or-nest'],
      'func-style': ['error', 'declaration'],
      'no-console': 'off',
    },
  },
);
