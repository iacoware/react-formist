module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
    },
    globals: {},
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
    ],
    plugins: [
        "react",
        "prettier",
        "react-hooks",
        "testing-library",
        "jest-dom",
    ],
    settings: {
        react: {
            pragma: "React",
            version: "detect",
        },
    },
    rules: {
        "prettier/prettier": ["error", { endOfLine: "auto" }],
        "no-unused-vars": ["warn", { ignoreRestSiblings: true }],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
    },
}
