/*globals test, expect*/
import * as yup from "yup"
import { renderHook, act } from "@testing-library/react-hooks"
import useFormist from "../src/useFormist"

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

test.skip("nested schema", async () => {
    let schema = yup.object().shape({
        fullName: yup.string().required(),
        address: yup.object().shape({
            street: yup.string().required(),
            city: yup.string().required(),
        }),
    })

    const { result } = renderHook(() => useFormist(null, { yupSchema: schema }))

    await act(() => result.current.submit())

    const cityProps = getFieldProps("address.city", result)
    expect(cityProps.error).toBeDefined()
})

const getFieldProps = (fieldName, result) =>
    result.current.getFieldProps(fieldName)
const getErrors = obj => obj.current.errors
