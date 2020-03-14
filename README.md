# Formist - minimal react hook form handler

![lic](https://badgen.net/npm/license/react-formist) ![min](https://badgen.net/bundlephobia/min/react-formist) ![minzip](https://badgen.net/bundlephobia/minzip/react-formist) ![commits](https://badgen.net/github/open-issues/iacoware/react-formist)

Install

`npm install react-formist`

Run the example

`npm run example`

## Features

-   Headless form state management (bring your own UI)
-   Support nested object path like `address.city`
-   Support arrays path like...
    -   `customer.address.0`
    -   `customer.address.1`
-   ... and even more nested like
    -   `customer.address.0.city` and `customer.address.0.street`
    -   `customer.address.1.city` and `customer.address.1.street`
-   Support sync or async validation (`options.onValidate`)
-   Optional integration with [Yup](https://github.com/jquense/yup) (`options.schema`)
-   Good tests suite
-   Used in production
-   Zero dependencies

## Usage

#### Simple form

```js
function SimpleForm({ onSubmit }) {
    const initialValues = { firstName: "Kent", lastName: "Beck"}
    const formist = useFormist(initialValues, { onSubmit })

    return (
        <form {...formist.form()}>
            <div>
                <input type="text" {...formist.field("firstName")} />
            </div>
            <div>
                <input type="text" {...formist.field("lastName")} />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
```

#### Form with [Yup](https://github.com/jquense/yup) validation

```js
function YupForm({ onSubmit }) {
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
    })
    const formist = useFormist({}, { schema, onSubmit })

    return (
        <form {...formist.form()}>
            <div>
                <input type="text" {...formist.field("firstName")} />
                <span className="validation-error">{formist.errors.firstName}</span>
            </div>
            <div>
                <input type="text" {...formist.field("lastName")} />
                <span className="validation-error">{formist.errors.lastName}</span>
            </div>
            <button {...formist.submitButton()}>Submit</button>
        </form>
    )
```

#### More complex form

```js
function TextField({ value, onChange, error }) {
    return (
        <>
            <input type="text" value={value} onChange={onChange} />
            <span className="validation-error">{error}</span>
        </>
    )
}

function MoreComplexForm({ onSubmit }) {
    const data = {
        releases: [{ id: 1 }, { id: 2 }, { id: 3 }],
    }
    const formist = useFormist({}, { schema: movieSchema, onSubmit })

    return (
        <form {...formist.form()}>
            <div>
                <TextField {...formist.field("name")} />
            </div>

            <div>
                {data.releases.map((release, index) => (
                    <div key={release.id}>
                        <span>{release.id} - </span>
                        <TextField
                            {...formist.field(`releases.${index}.location`)}
                        />
                        <TextField
                            {...formist.field(`releases.${index}.date`)}
                        />
                    </div>
                ))}
            </div>
            <button {...formist.submitButton()}>Submit</button>
        </form>
    )
}
```
