import React from "react"
import * as yup from "yup"
import useFormist from "../../../src/useFormist"

export default function YupForm({ onSubmit }) {
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
    })
    const formist = useFormist({}, { schema, onSubmit })

    return (
        <form {...formist.form()}>
            <div>
                <input type="text" {...formist.field("firstName")} />
                <span className="validation-error">
                    {formist.errors.firstName}
                </span>
            </div>
            <div>
                <input type="text" {...formist.field("lastName")} />
                <span className="validation-error">
                    {formist.errors.lastName}
                </span>
            </div>
            <button {...formist.submitButton()}>Submit</button>
        </form>
    )
}
