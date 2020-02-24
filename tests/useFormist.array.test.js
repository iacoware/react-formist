/*globals test, expect*/
import { renderHook, act } from "@testing-library/react-hooks"
import useFormist from "../src/useFormist"

test("many elements", () => {
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
