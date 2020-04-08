/*globals test, expect*/
import React, { useEffect } from "react"
import { render } from "@testing-library/react"
import useFormist from "../src/useFormist"

const AddressForm = ({ values, onSubmit }) => {
    const formist = useFormist(values, { onSubmit })
    useEffect(() => {
        formist.change("name", "Fred")
    }, [formist.change, formist.setError])

    return (
        <div>
            <input type="text" {...formist.field("name")} />
            <button {...formist.submitButton()}>Submit</button>
            <p>{formist.values.name}</p>
        </div>
    )
}

test("can render", () => {
    render(<AddressForm values={{}} />)
})

test("render initial values", () => {
    const { getByDisplayValue } = render(
        <AddressForm values={{ name: "Max" }} />,
    )

    const input = getByDisplayValue("Fred")

    expect(input).not.toBeNull()
})
