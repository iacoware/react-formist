import React from "react"
import useFormist from "../../../src/useFormist"

export default function SimpleForm({ onSubmit }) {
    const initialValues = { firstName: "Kent", lastName: "Beck" }
    const formist = useFormist(initialValues, { onSubmit })

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
}
