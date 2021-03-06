/*globals test, expect, jest*/
import React from "react"
import { render } from "@testing-library/react"
import useFormist from "../src/useFormist"

const ArrayForm = ({ values }) => {
    const formist = useFormist(values)

    return (
        <div>
            <input type="text" {...formist.field("addresses.0.city")} />
            <input type="text" {...formist.field("addresses.1.city")} />
            <button {...formist.submitButton()}>Submit</button>
        </div>
    )
}

test("render form", () => {
    render(<ArrayForm />)
    render(<ArrayForm values={null} />)
})

test("render sparse array", () => {
    const initialValues = { addresses: [null, { city: "New York City" }] }

    render(<ArrayForm values={initialValues} />)
})
