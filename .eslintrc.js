module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    "space-in-parens": ["error", "never"],
    "indent": ["error", 2],
    "no-multi-spaces": ["error"]
  }
}
