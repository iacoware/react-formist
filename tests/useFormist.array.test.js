/*globals test, expect*/
import { renderHook, act } from "@testing-library/react-hooks"
import useFormist from "../src/useFormist"

test("nested initial values", () => {
    const initialValues = {
        customer: {
            name: "Fred George",
            addresses: [{ city: "New York" }, { city: "Los Angeles" }],
        },
    }
    const { result } = renderHook(() => useFormist(initialValues))

    const field = result.current.field("customer.addresses.1.city")

    expect(field.name).toBe("customer.addresses.1.city")
    expect(field.value).toBe("Los Angeles")
})

test("change nested values", () => {
    const { result } = renderHook(() => useFormist([]))

    act(() => {
        result.current.change("customer.name", "Fred George")
        result.current.change("customer.addresses.0.city", "New York")
        result.current.change("customer.addresses.1.city", "Los Angeles")
    })

    const values = getValues(result)
    expect(values).toStrictEqual({
        customer: {
            name: "Fred George",
            addresses: [{ city: "New York" }, { city: "Los Angeles" }],
        },
    })
})

const getValues = obj => obj.current.values
