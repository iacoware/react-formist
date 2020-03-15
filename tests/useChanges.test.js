/*globals test, expect*/
import { renderHook, act } from "@testing-library/react-hooks"
import useChanges from "../src/useChanges"

test("no initial values", () => {
    const { result: result1 } = renderHook(() => useChanges())
    const { result: result2 } = renderHook(() => useChanges(null))

    expect(result1.current.values).toStrictEqual({})
    expect(result2.current.values).toStrictEqual({})
})

test("change one", () => {
    const { result } = renderHook(() => useChanges())

    act(() => result.current.change("name", "Fred"))

    expect(result.current.isChanged("name")).toBe(true)
})
