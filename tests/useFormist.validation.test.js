/*globals test, expect*/
import { renderHook, act } from "@testing-library/react-hooks"
import useFormist from "../src/useFormist"

/**
 * options.onValidate should return an object in case of errors or nothing
 * nothing (undefined, null) in case everything it's ok
 * Eg: {firstName: "This is required"}
 */

test("validate through options.onValidation", async () => {
    const { result } = renderHook(() =>
        useFormist(null, {
            onValidate: () => ({ firstName: "In someway it's invalid" }),
        }),
    )

    await act(() => result.current.submit())

    expect(result.current.errors.firstName).toBeDefined()
})

test("validation fail", async () => {
    let submitted = false
    const { result } = renderHook(() =>
        useFormist(null, {
            onValidate: () => ({ firstName: "In someway it's invalid" }),
            onSubmit: () => {
                submitted = true
            },
        }),
    )

    await act(() => result.current.submit())

    expect(submitted).toBe(false)
})

test("previous errors, validation success", async () => {
    const { result } = renderHook(() =>
        useFormist(null, { onValidate: () => {} }),
    )

    await act(() => {
        result.current.setError("firstName", "Try again!")
        return result.current.submit()
    })

    expect(result.current.errors).toStrictEqual({})
})
