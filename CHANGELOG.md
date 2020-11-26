## v1.1.1 - 2020-11-26

-   Fixed bug in `isInteger` helper function. The call `isInteger("8bbbef36adf64929bba8b656fa82f05a")` was returning true. Affect formist when you use a guid inside a path like '8bbbef36adf64929bba8b656fa82f05a.name'

## v1.1.0 - 2020-10-22

-   Add `clear(defaultValues | null)` function which clear current values and errors

## v1.0.0 - 2020-05-21

-   Add `touch(path, value)` function which mark the field as touched
    -   Breaking change: `change(path, value)` changes the value without marking the field as touched
    -   Breaking change: rename `isChanged` to `isTouched`

## v0.3.1 - 2020-04-08

-   Calling `isChanged()` without a path return true if there's any error
-   `change` function is memoized and usable as a `useEffect` dependency
-   Add `isValid(path|null)`. It must be called after a `validate()` call to know if a filed|form is valid

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
