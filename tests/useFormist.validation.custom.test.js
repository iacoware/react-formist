/*globals test, expect*/
import { renderHook, act } from "@testing-library/react-hooks"
import useFormist from "../src/useFormist"

test("one field, one change value + onBlur", async () => {
    const onValidate = () => ({ age: "age is not a number" })
    const { result } = renderHook(() => useFormist({}, { onValidate }))

    await act(async () => {
        await result.current.touch("age", "not_a_number")
        await result.current.field("age").onBlur({})
    })

    expect(result.current.errors.age).toMatch(/age is not a number/)
})

test("no changes + onBlur", async () => {
    const onValidate = () => ({ age: "age is not a number" })
    const { result } = renderHook(() => useFormist({}, { onValidate }))

    await act(async () => {
        await result.current.field("age").onBlur({})
    })

    expect(result.current.errors).toStrictEqual({})
})

test("many field, one change + onBlur", async () => {
    const rules = {
        name: (value) => (!value ? { name: "name is required" } : null),
        age: (value) =>
            !value || value != "42" ? { age: "age not quite right" } : null,
    }
    const onValidate = (values, name) => rules[name](values[name])

    const { result } = renderHook(() => useFormist({}, { onValidate }))

    await act(async () => {
        await result.current.touch("age", "not_a_number")
        await result.current.field("age").onBlur({})
    })

    expect(result.current.errors.age).toMatch(/age not quite right/)
    expect(result.current.errors.name).not.toBeDefined()
})
