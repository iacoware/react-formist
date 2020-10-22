/*globals test, expect*/
import { renderHook, act } from "@testing-library/react-hooks"
import useChanges from "../src/useChanges"

test("no initial values", () => {
    const { result: result1 } = renderHook(() => useChanges())
    const { result: result2 } = renderHook(() => useChanges(null))

    expect(result1.current.values).toStrictEqual({})
    expect(result2.current.values).toStrictEqual({})
})

test("clear - simple values", () => {
    const { result } = renderHook(() => useChanges())
    act(() => {
        result.current.change("firstName", "Fred")
        result.current.change("lastName", "Johnson")
    })

    act(() => result.current.clear())

    expect(result.current.values).toStrictEqual({})
})

test("clear - reset to default values", () => {
    const defaultValues = {
        firstName: "Fred",
        lastName: "Johnson",
    }
    const { result } = renderHook(() => useChanges())
    act(() => {
        result.current.change("firstName", "John")
        result.current.change("lastName", "Fredson")
    })

    act(() => result.current.clear(defaultValues))

    expect(result.current.values).toStrictEqual(defaultValues)
})
