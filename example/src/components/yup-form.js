import React from "react"
import * as yup from "yup"
import useFormist from "../../../src/useFormist"
import Field from "./field"

export default function YupForm({ onSubmit }) {
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
    })
    const formist = useFormist({}, { schema, onSubmit })

    return (
        <form {...formist.form()}>
            <Field label="Firstname">
                <input type="text" {...formist.field("firstName")} />
                <span>{formist.errors.firstName}</span>
            </Field>

            <Field label="Lastname">
                <input type="text" {...formist.field("lastName")} />
                <span>{formist.errors.lastName}</span>
            </Field>

            <button className="button is-warning" {...formist.submitButton()}>
                Submit
            </button>
        </form>
    )
}
