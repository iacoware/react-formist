## v0.2.8

-   Fix sparse array bug, issue [#7](https://github.com/iacoware/react-formist/issues/7)
-   Better error when the target object and property name expect different types. Related to [#6](https://github.com/iacoware/react-formist/issues/6)
    -   wrong => target: {} property: "0" (got an object instead of an array)
    -   right => target: [] property: "0" (got an array AND an array index)

## v0.2.7

-   Fix bug on error handling for nested path like `adress[{ street: ["a", "b", null] }]`. Thanks to @mbarto
