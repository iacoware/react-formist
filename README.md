# Formist - minimal react hook form handler

Install

`npm install react-formist`

Run the example

`npm run example`

## Features

-   headless form state management (bring your own UI)
-   support nested object path like `address.city`
-   support arrays path like...
    -   `customer.address.0`
    -   `customer.address.1`
-   ... and even more nested like
    -   `customer.address.0.city` and `customer.address.0.street`
    -   `customer.address.1.city` and `customer.address.1.street`

## Usage

#### Simple form

```js
function AddressForm({ onSubmit }) {
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

#### Form with Yup validation

```js
function AddressForm({ onSubmit }) {
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
                <span className="validation-error">{formist.errors.lastName}</span
            </div>
            <button {...formist.submitButton()}>Submit</button>
        </form>
    )
```
