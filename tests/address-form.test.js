/*globals test, expect, jest*/
import React from "react"
import { render, fireEvent, wait } from "@testing-library/react"
import useFormist from "../src/useFormist"

const AddressForm = ({ values, onSubmit }) => {
    const formist = useFormist(values, { onSubmit })

    return (
        <div>
            <input type="text" {...formist.field("firstName")} />
            <button {...formist.submitButton()}>Submit</button>
            <p>{formist.values.firstName}</p>
        </div>
    )
}

test("render address form", () => {
    render(<AddressForm values={{ firstName: "Max" }} />)
    render(<AddressForm values={null} />)
})

test("render initial values", () => {
    const { getByDisplayValue } = render(
        <AddressForm values={{ firstName: "Max" }} />,
    )

    const input = getByDisplayValue("Max")

    expect(input).not.toBeNull()
})

test("change value", () => {
    const initialValues = { firstName: "Max" }
    const { getByDisplayValue, getByText } = render(
        <AddressForm values={initialValues} />,
    )
    const input = getByDisplayValue("Max")

    fireEvent.change(input, { target: { value: "Fred" } })
    const text = getByText("Fred")

    expect(text).not.toBeNull()
})

test("change value outside initial values", () => {
    const { getByText, container } = render(<AddressForm values={{}} />)
    const firstNameInput = container.querySelector('input[name="firstName"]')

    fireEvent.change(firstNameInput, { target: { value: "Fred" } })
    const text = getByText("Fred")

    expect(text).not.toBeNull()
})

test("click submit button", async () => {
    const onSubmit = jest.fn()
    const { getByText } = render(
        <AddressForm values={{}} onSubmit={onSubmit} />,
    )

    const submitButton = getByText("Submit")
    fireEvent.click(submitButton, event())

    await wait()

    expect(onSubmit).toHaveBeenCalled()
})

const event = value => ({ preventDefault() {}, target: { value: value } })
