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

test("change many", () => {
    const { result } = renderHook(() => useChanges())

    act(() => {
        result.current.change("name", "Fred")
        result.current.change("age", 48)
        result.current.change("nickname", "@fred")
    })

    expect(result.current.isChanged("name")).toBe(true)
    expect(result.current.isChanged("age")).toBe(true)
    expect(result.current.isChanged("nickname")).toBe(true)
})

test("one change, no path", () => {
    const { result } = renderHook(() => useChanges())

    act(() => result.current.change("name", "Fred"))

    expect(result.current.isChanged()).toBe(true)
})

test("no changes, no path", () => {
    const { result } = renderHook(() => useChanges())

    expect(result.current.isChanged()).toBe(false)
})
