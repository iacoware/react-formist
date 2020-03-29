import React from "react"
import useFormist from "../../../src/useFormist"
import Field from "./field"

export default function SimpleForm({ onSubmit }) {
    const initialValues = { firstName: "Darth", lastName: "Vader" }
    const formist = useFormist(initialValues, { onSubmit })

    return (
        <form {...formist.form()}>
            <Field label="Firstname">
                <input type="text" {...formist.field("firstName")} />
            </Field>
            <Field label="Lastname">
                <input type="text" {...formist.field("lastName")} />
            </Field>
            <button className="button is-warning">Submit</button>
        </form>
    )
}
