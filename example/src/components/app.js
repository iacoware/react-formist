import React, { useState } from "react"
import useFormist from "../../../src/useFormist"

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
}

const App = () => {
    const [formValues, setFormValues] = useState({})

    const onSubmit = values => setFormValues(values)

    return (
        <div>
            <h1>Address form</h1>
            <AddressForm onSubmit={onSubmit} />

            <div>{JSON.stringify(formValues, null, 2)}</div>
        </div>
    )
}

export default App
