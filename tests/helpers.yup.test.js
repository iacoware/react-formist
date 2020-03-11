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

test("extract yup errors on arrays", () => {
    let schema = yup.object().shape({
        address: yup.array().of(
            yup.object().shape({
                street: yup.string().required(),
                city: yup.string().required(),
            }),
        ),
    })

    let result = {}
    const values = {
        address: [{ street: "5th avenue" }, { city: "Los Angeles" }],
    }
    try {
        schema.validateSync(values, { abortEarly: false })
    } catch (errors) {
        result = extractYupErrors(errors)
    }

    expect(result).toStrictEqual({
        "address.0.city": "address.city is a required field",
        "address.1.street": "address.street is a required field",
    })
})

test("extract yup errors on nested arrays", () => {
    let schema = yup.object().shape({
        address: yup.array().of(
            yup.object().shape({
                street: yup.array().of(yup.string().required()),
                city: yup.string().required(),
            }),
        ),
    })

    let result = {}
    const values = {
        address: [{ street: ["5th", "avenue", ""] }],
    }
    try {
        schema.validateSync(values, { abortEarly: false })
    } catch (errors) {
        result = extractYupErrors(errors)
    }
    expect(result).toStrictEqual({
        "address.0.city": "address.city is a required field",
        "address.0.street.2": "address.street is a required field",
    })
})
