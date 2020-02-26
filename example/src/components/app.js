import React, { useState } from "react"
import SimpleAddressForm from "./simple-address-form"
import YupAddressForm from "./yup-address-form"

const App = () => {
    const [formValues, setFormValues] = useState({})

    const onSubmit = values => setFormValues(values)

    return (
        <div>
            <h1>Simple address form</h1>
            <SimpleAddressForm onSubmit={onSubmit} />

            <h1>Yup address form</h1>
            <YupAddressForm onSubmit={onSubmit} />

            <pre>{JSON.stringify(formValues, null, 2)}</pre>
        </div>
    )
}

export default App
