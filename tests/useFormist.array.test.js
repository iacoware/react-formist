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

const getValues = obj => obj.current.values
