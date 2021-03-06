/*globals test, expect*/
import { renderHook, act } from "@testing-library/react-hooks"
import useFormist from "../src/useFormist"

test("no change", async () => {
    const initialValues = { firstName: "John", age: 23 }
    let submittedValues = {}
    const { result } = renderHook(() =>
        useFormist(initialValues, {
            onSubmit: values => (submittedValues = values),
        }),
    )

    await act(() => result.current.submit())

    expect(submittedValues).toStrictEqual(initialValues)
})

test("one change", async () => {
    const initialValues = { firstName: "John", age: 23 }
    let submittedValues = {}
    const { result } = renderHook(() =>
        useFormist(initialValues, {
            onSubmit: values => (submittedValues = values),
        }),
    )

    await act(async () => {
        await result.current.change("firstName", "Fred")
        await result.current.submit()
    })

    expect(submittedValues).toStrictEqual({ firstName: "Fred", age: 23 })
})

test("form submit", async () => {
    const initialValues = { firstName: "John", age: 23 }
    let submitted = false
    const { result } = renderHook(() =>
        useFormist(initialValues, {
            onSubmit: () => (submitted = true),
        }),
    )

    await act(() => result.current.getFormProps().onSubmit(event()))

    return expect(submitted).toBe(true)
})

test("submit button click", async () => {
    const initialValues = { firstName: "John", age: 23 }
    let submitted = false
    const { result } = renderHook(() =>
        useFormist(initialValues, {
            onSubmit: () => (submitted = true),
        }),
    )

    await act(() => result.current.getSubmitButtonProps().onClick(event()))

    return expect(submitted).toBe(true)
})

const event = () => ({ preventDefault() {} })
