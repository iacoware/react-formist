/*globals test, expect*/
import { renderHook, act } from "@testing-library/react-hooks"
import useFormist from "../src/useFormist"

test("one element", () => {
    const { result } = renderHook(() => useFormist([]))

    act(() => result.current.change("[0]", "Fred"))

    const values = getValues(result)
    expect(values.length).toBe(1)
    expect(values[0]).toBe("Fred")
})

test("many elements", () => {
    const { result } = renderHook(() => useFormist([]))

    act(() => {
        result.current.change("[0]", "Fred")
        result.current.change("[1]", "George")
        result.current.change("[2]", "Nick")
    })

    const values = getValues(result)
    expect(values.length).toBe(3)
    expect(values).toContain("Fred")
    expect(values).toContain("George")
    expect(values).toContain("Nick")
})

const getValues = obj => obj.current.values
