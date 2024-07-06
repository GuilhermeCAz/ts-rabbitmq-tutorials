import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import tsEslint from 'typescript-eslint';

export default tsEslint.config(
  // JavaScript configurations
  eslint.configs.all,

  // TypeScript configurations
  ...tsEslint.configs.strictTypeChecked,
  ...tsEslint.configs.stylisticTypeChecked,

  { ignores: ['eslint.config.js'] },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsEslint.parser,
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
      'no-magic-numbers': ['error', { ignore: [0, 1] }],
      'sort-vars': 'off',
    },
  },
);
