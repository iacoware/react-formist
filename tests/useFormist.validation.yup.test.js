/*globals test, expect*/
import * as yup from "yup"
import { renderHook, act } from "@testing-library/react-hooks"
import { log } from "../src/helpers"
import useFormist from "../src/useFormist"

const nameAndAgeSchema = yup.object().shape({
    name: yup.string().required(),
    age: yup.number().required(),
})

test("validate through options.schema", async () => {
    const schema = nameAndAgeSchema
    const { result } = renderHook(() => useFormist({}, { schema }))

    await act(() => result.current.submit())

    expect(result.current.errors.name).toBeDefined()
    expect(result.current.errors.age).toBeDefined()
    expect(result.current.field("name").error).toBeDefined()
})

test("change fields in error", async () => {
    const schema = nameAndAgeSchema
    const { result } = renderHook(() => useFormist({}, { schema }))

    await act(async () => {
        await result.current.change("name", "John")
        await result.current.change("age", "")
        await result.current.validate()
    })
    expect(result.current.errors.name).not.toBeDefined()
    expect(result.current.errors.age).toBeDefined()

    await act(async () => {
        await result.current.change("name", "")
        await result.current.change("age", "25")
        await result.current.validate()
    })
    expect(result.current.errors.name).toBeDefined()
    expect(result.current.errors.age).not.toBeDefined()
})

test("nested schema", async () => {
    let schema = yup.object().shape({
        fullName: yup.string().required(),
        address: yup.array().of(
            yup.object().shape({
                street: yup.string().required(),
                city: yup.string().required(),
            }),
        ),
    })
    const initialValues = {
        address: [{ street: "5th avenue" }, { city: "Los Angeles" }],
    }

    const { result } = renderHook(() => useFormist(initialValues, { schema }))

    await act(() => result.current.validate())

    expect(result.current.field("address.0.city").error).not.toBe("")
    expect(result.current.error("address.0.city")).not.toBe("")
    expect(result.current.errors.address[0].city).not.toBe("")
    expect(result.current.field("address.1.street").error).not.toBe("")
    expect(result.current.error("address.1.street")).not.toBe("")
    expect(result.current.errors.address[1].street).not.toBe("")
})

test("non yup errors", async () => {
    expect.assertions(1)
    //there's a typo below, required is a function and should be invoked as required()
    let schema = yup.object().shape({
        firstName: yup.string().required,
    })
    const { result } = renderHook(() => useFormist({}, { schema }))

    try {
        await result.current.validate()
    } catch (err) {
        expect(err).toBeTruthy()
    }
})

test("global error", async () => {
    expect.assertions(1)
    let schema = yup
        .object()
        .shape({
            firstName: yup.string(),
            age: yup.number(),
        })
        .test(
            "not-both-empty",
            "one of firstName and age should have a value",
            obj => obj.firstName || obj.age,
        )
    const { result } = renderHook(() => useFormist({}, { schema }))

    await act(() => result.current.validate())

    expect(result.current.globalError).toBe(
        "one of firstName and age should have a value",
    )
})

test("many field, one change + onBlur", async () => {
    const schema = nameAndAgeSchema
    const { result } = renderHook(() => useFormist({}, { schema }))

    await act(async () => {
        await result.current.touch("age", "not_a_number")
        await result.current.field("age").onBlur({})
    })

    expect(result.current.errors.age).toMatch(/age must be a `number` type/)
    expect(result.current.errors.name).not.toBeDefined()
})

test("previous error, one change + onBlur", async () => {
    const schema = nameAndAgeSchema
    const { result } = renderHook(() => useFormist({}, { schema }))

    await act(async () => {
        await result.current.setError("name", "name error")
        await result.current.touch("age", "not_a_number")
        await result.current.field("age").onBlur({})
    })

    expect(result.current.errors.age).toMatch(/age must be a `number` type/)
    expect(result.current.errors.name).toBe("name error")
})
