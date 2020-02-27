import React, { useState } from "react"
import SimpleForm from "./simple-form"
import YupForm from "./yup-form"
import MoreComplexForm from "./more-complex-form"

const App = () => {
    const [formValues, setFormValues] = useState({})

    const onSubmit = values => setFormValues(values)

    return (
        <div>
            <h1>Simple form</h1>
            <SimpleForm onSubmit={onSubmit} />

            <h1>Yup form</h1>
            <YupForm onSubmit={onSubmit} />

            <h1>More complex form</h1>
            <MoreComplexForm onSubmit={onSubmit} />

            <pre>{JSON.stringify(formValues, null, 2)}</pre>
        </div>
    )
}

export default App
