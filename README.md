# Formist - minimal react hook form handler

### Run the example

`npm run example`

### Usage

```js
function AddressForm({ onSubmit }) {
    const formist = useFormist(null, {
        onSubmit,
    })

    return (
        <form {...formist.formProps()}>
            <div>
                <input type="text" {...formist.fieldProps("firstName")} />
            </div>
            <div>
                <input type="text" {...formist.fieldProps("lastName")} />
            </div>
            <button>Submit</button>
        </form>
    )
```
