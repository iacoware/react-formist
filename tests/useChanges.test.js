/*globals test, expect*/
import { renderHook, act } from "@testing-library/react-hooks"
import useChanges from "../src/useChanges"

test("no initial values", () => {
    const { result: result1 } = renderHook(() => useChanges())
    const { result: result2 } = renderHook(() => useChanges(null))

    expect(result1.current.values).toStrictEqual({})
    expect(result2.current.values).toStrictEqual({})
})

test("single path, change one", () => {
    const { result } = renderHook(() => useChanges())

    act(() => result.current.touch("name", "Fred"))

    expect(result.current.isTouched("name")).toBe(true)
})

test("single path, change many", () => {
    const { result } = renderHook(() => useChanges())

    act(() => {
        result.current.touch("name", "Fred")
        result.current.touch("age", 48)
        result.current.touch("nickname", "@fred")
    })

    expect(result.current.isTouched("name")).toBe(true)
    expect(result.current.isTouched("age")).toBe(true)
    expect(result.current.isTouched("nickname")).toBe(true)
})

test("whole form, one change", () => {
    const { result } = renderHook(() => useChanges())

    act(() => result.current.touch("name", "Fred"))

    expect(result.current.isTouched()).toBe(true)
})

test("whole form, no changes", () => {
    const { result } = renderHook(() => useChanges())

    expect(result.current.isTouched()).toBe(false)
})

test("touch vs change", () => {
    const { result } = renderHook(() => useChanges())

    act(() => {
        result.current.change("name", "Fred")
        result.current.touch("age", "21")
    })

    expect(result.current.isTouched("name")).toBe(false)
    expect(result.current.isTouched("age")).toBe(true)
})
