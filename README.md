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
        <form {...formist.form()}>
            <div>
                <input type="text" {...formist.field("firstName")} />
            </div>
            <div>
                <input type="text" {...formist.field("lastName")} />
            </div>
            <button>Submit</button>
        </form>
    )
```
