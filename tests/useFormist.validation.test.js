/*globals test, expect*/
import * as yup from "yup"
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

test("validate through options.yupSchema", async () => {
    let schema = yup.object().shape({
        firstName: yup.string().required(),
        age: yup.number().required(),
    })

    const { result } = renderHook(() =>
        useFormist({ firstName: "" }, { yupSchema: schema }),
    )

    await act(() => result.current.submit())

    expect(getErrors(result).firstName).toBeDefined()
    expect(getErrors(result).age).toBeDefined()
    expect(getFieldProps("firstName", result).error).toBeDefined()
})

test("doesn't submit if invalid", async () => {
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

const getFieldProps = (fieldName, result) =>
    result.current.getFieldProps(fieldName)
const getErrors = obj => obj.current.errors
