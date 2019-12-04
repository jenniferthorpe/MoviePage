module.exports = {
  extends: ["airbnb", "airbnb/hooks", "prettier", "prettier/react"],
  plugins: ["prettier"],
  parser: 'babel-eslint',
  rules: {
    "prettier/prettier": ["error"]
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      globalReturn: false,
    },
    allowImportExportEverywhere: false,
  },
  env: {
    browser: true,
    node: true
  },
  rules: {
    "react/static-property-placement": "off",
    "quotes": ["error", "single"],
    "react/jsx-filename-extension": "off",
    "react/state-in-constructor": "off",
    "import/prefer-default-export": "off",
    "react/require-default-props": "off",
  }

};
