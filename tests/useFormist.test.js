/*globals test, expect*/
import { renderHook } from "@testing-library/react-hooks"
import useFormist from "../src/useFormist"

test("no initial values", () => {
    const { result: result1 } = renderHook(() => useFormist())
    const { result: result2 } = renderHook(() => useFormist(null))

    expect(getValues(result1)).toStrictEqual({})
    expect(getValues(result2)).toStrictEqual({})
})

test("initial values", () => {
    const initialValues = { firstName: "John" }
    const { result } = renderHook(() => useFormist(initialValues))

    expect(getValues(result)).toStrictEqual(initialValues)
})

test("getFieldProps() shape", () => {
    const initialValues = { firstName: "John" }
    const { result } = renderHook(() => useFormist(initialValues))

    const props = getFieldProps("firstName", result)

    expect(props.value).toBe("John")
    expect(typeof props.onChange).toBe("function")
})

const getFieldProps = (fieldName, result) =>
    result.current.getFieldProps(fieldName)
const getValues = (obj) => obj.current.values
