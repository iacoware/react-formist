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
    plugins: ["react", "prettier"],
    settings: {
        react: {
            pragma: "React",
            version: "detect",
        },
    },
    rules: {
        "prettier/prettier": ["error"],
        "react/prop-types": ["off"], // Disabled cause it's a playground. Enable it in prod
        "no-unused-vars": ["warn"], // Disabled cause it's a playground. Enable it in prod
    },
}
