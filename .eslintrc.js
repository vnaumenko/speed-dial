module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "standard-with-typescript",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@stylistic/js"],
  rules: {
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "react/no-array-index-key": "error",
    "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-invalid-void-type": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "prettier/prettier": ["warn"],
    "react/react-in-jsx-scope": "off",
    "react/jsx-boolean-value": ["error", "never"],
    "import/newline-after-import": ["error"],
    "prefer-template": "error",
    "import/order": ["error"],
    "import/no-unresolved": "off",
    "no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
    "react/jsx-curly-brace-presence": ["error", "never"],
  },
};
