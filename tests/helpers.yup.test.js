/*globals test, expect*/
import * as yup from "yup"
import { extractYupErrors } from "../src/helpers.yup"

test("extract yup errors", () => {
    let schema = yup.object().shape({
        firstName: yup.string().required(),
        age: yup.number().required(),
    })

    let result = {}
    try {
        schema.validateSync({}, { abortEarly: false })
    } catch (errors) {
        result = extractYupErrors(errors)
    }

    expect(result).toStrictEqual({
        firstName: "firstName is a required field",
        age: "age is a required field",
    })
})
