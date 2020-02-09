import React, { useState } from "react"
import useFormist from "../../../src/useFormist"

const useFormist2 = (initialValues = {}, options = {}) => {
    //Let's see what happens...
    const [values, setValues] = useState(initialValues)
}

function AddressForm({ onSubmit }) {
    //const [value, setValue] = useState("pluto")
    const formist = useFormist()

    // const formProps = formist.getFormProps()
    // const fieldProps = formist.getFieldProps("firstName")
    // console.log("Formist", formist)
    // console.log("Form props", formProps)
    // console.log("Field props", fieldProps)

    return <h1>here goes a form...</h1>
}

const App = () => {
    return (
        <div>
            <h1>Address form</h1>
            <AddressForm />
        </div>
    )
}

export default App
