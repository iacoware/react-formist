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
