/*globals test, expect, jest*/
import { renderHook, act } from "@testing-library/react-hooks"
import useFormist from "../src/useFormist"

/**
 * options.onValidate should return an object in case of errors or nothing
 * nothing (undefined, null) in case everything it's ok
 * Eg: {firstName: "This is required"}
 */

const noErrors = () => {}

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
    const options = { onValidate: noErrors }
    const { result } = renderHook(() => useFormist({}, options))

    act(() => result.current.setError("firstName", "Try again!"))
    await act(() => result.current.submit())

    expect(result.current.errors).toStrictEqual({})
})

test("validationMode: submit", async () => {
    const onValidate = jest.fn()
    const options = { onValidate, validationMode: "submit" }
    const { result } = renderHook(() => useFormist({}, options))

    act(() => result.current.change("name", "Fred"))
    result.current.field("name").onBlur(event())
    expect(onValidate).not.toHaveBeenCalled()

    await act(() => result.current.submit())
    expect(onValidate).toHaveBeenCalled()
})

test("validationMode: blur", async () => {
    const onValidate = jest.fn()
    const options = { onValidate, validationMode: "blur" }
    const { result } = renderHook(() => useFormist({}, options))

    act(() => result.current.change("name", "Fred"))
    result.current.field("name").onBlur(event())
    expect(onValidate).toHaveBeenCalled()
})

test("default validationMode", async () => {
    const onValidate = jest.fn()
    const options = { onValidate }
    const { result } = renderHook(() => useFormist({}, options))

    act(() => result.current.change("name", "Fred"))
    result.current.field("name").onBlur(event())
    expect(onValidate).toHaveBeenCalled()
})

const event = () => ({})
