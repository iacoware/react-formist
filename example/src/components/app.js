import React, { useState } from "react"
import SimpleAddressForm from "./simple-address-form"

const App = () => {
    const [formValues, setFormValues] = useState({})

    const onSubmit = values => setFormValues(values)

    return (
        <div>
            <h1>Address form</h1>
            <SimpleAddressForm onSubmit={onSubmit} />

            <pre>{JSON.stringify(formValues, null, 2)}</pre>
        </div>
    )
}

export default App
