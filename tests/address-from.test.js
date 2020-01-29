/*globals test, expect*/
import React from "react"
import { render, fireEvent, waitForElement } from "@testing-library/react"
import useFormist from "../src/useFormist"

const AddressForm = () => {
    const formist = useFormist({ firstName: "Max" }, {})

    return (
        <div>
            <input type="text" {...formist.fieldProps("firstName")} />
        </div>
    )
}

test("render address form", () => {
    const { getByText, getByRole } = render(<AddressForm />)
})
