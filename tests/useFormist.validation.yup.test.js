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

const getFieldProps = (fieldName, result) =>
    result.current.getFieldProps(fieldName)
const getErrors = obj => obj.current.errors
