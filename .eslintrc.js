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
  plugins: ["react"],
  rules: {
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/semi": ["error", "always"],
    "react/no-array-index-key": "error",
    "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
    "@typescript-eslint/explicit-function-return-type": "off",
    "prettier/prettier": ["warn"],
    "react/react-in-jsx-scope": "off",
    "import/newline-after-import": ["error"],
    "import/order": ["error"],
    "import/no-unresolved": "off",
    "no-unused-vars": ["error", { vars: "all", args: "after-used", ignoreRestSiblings: false }],
  },
};
