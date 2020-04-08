/*globals test, expect*/
import { renderHook, act } from "@testing-library/react-hooks"
import useValidation from "../src/useValidation"

test("no initial values", () => {
    const { result: result1 } = renderHook(() => useValidation())
    const { result: result2 } = renderHook(() => useValidation(null))

    expect(result1.current.errors).toStrictEqual({})
    expect(result2.current.errors).toStrictEqual({})
})

test("one error", () => {
    const { result } = renderHook(() => useValidation())

    act(() => result.current.setError("name", "That's a horrible name"))

    expect(result.current.isValid("name")).toBe(false)
})

test("no error", () => {
    const { result } = renderHook(() => useValidation())

    expect(result.current.isValid("name")).toBe(true)
})

test("one error, no path", () => {
    const { result } = renderHook(() => useValidation())

    act(() => result.current.setError("name", "That's a horrible name"))

    expect(result.current.isValid()).toBe(false)
})

test("no error, no path", () => {
    const { result } = renderHook(() => useValidation())

    expect(result.current.isValid()).toBe(true)
})
