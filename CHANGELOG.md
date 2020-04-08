## vNext - ???

-   Calling `isChanged()` without a path return true if there's any error
-   `change` function is memoized and usable as a `useEffect` dependency

## v0.3.0 - 2020-03-29

-   added `valdationMode: blur|submit` (default is `blur`)
-   Give some visual love to the examples (`npm run example`)

## v0.2.9 - 2020-03-19

-   bugfix - yup integration: don't swallow exceptions which aren't for field validation

## v0.2.8 - 2020-03-15

-   Fix sparse array bug, issue [#7](https://github.com/iacoware/react-formist/issues/7)
-   Better error when the target object and property name expect different types. Related to [#6](https://github.com/iacoware/react-formist/issues/6)
    -   wrong => target: {} property: "0" (got an object instead of an array)
    -   right => target: [] property: "0" (got an array AND an array index)

## v0.2.7 - 2020-03-12

-   Fix bug on error handling for nested path like `adress[{ street: ["a", "b", null] }]`. Thanks to @mbarto
