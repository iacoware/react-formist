/*globals test, expect*/
import { renderHook, act } from "@testing-library/react-hooks"
import useFormist from "../src/useFormist"

test("onChange triggers change", () => {
    const { result } = renderHook(() => useFormist())

    act(() => {
        result.current.getFieldProps("firstName").onChange(event("Fred"))
        result.current.change("lastName", "Johnson")
    })

    expect(getValues(result)).toStrictEqual({
        firstName: "Fred",
        lastName: "Johnson",
    })
})

test("initial values, change one", () => {
    const initialValues = { firstName: "John" }
    const { result } = renderHook(() => useFormist(initialValues))

    act(() => result.current.change("firstName", "Fred"))

    expect(getValues(result).firstName).toBe("Fred")
})

test("initial values, change many", () => {
    const initialValues = { firstName: "John" }
    const { result } = renderHook(() => useFormist(initialValues))

    act(() => {
        result.current.change("firstName", "Fred")
        result.current.change("lastName", "Wozniac")
    })

    const values = getValues(result)
    expect(values.firstName).toBe("Fred")
    expect(values.lastName).toBe("Wozniac")
})

test("change one, keep others", () => {
    const initialValues = { firstName: "John", lastName: "Doe" }
    const { result } = renderHook(() => useFormist(initialValues))

    act(() => result.current.change("firstName", "Fred"))

    const exceptFirstName = except("firstName")
    const exceptResult = exceptFirstName(getValues(result))
    const exceptInitial = exceptFirstName(initialValues)
    expect(exceptResult).toStrictEqual(exceptInitial)
})

const event = (value) => ({ target: { value: value } })
const except = (propName) => (obj) => {
    const clone = { ...obj }
    delete clone[propName]
    return clone
}

const getValues = (obj) => obj.current.values
