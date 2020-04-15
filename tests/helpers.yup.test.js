/*globals test, expect*/
import * as yup from "yup"
import { extractYupErrors } from "../src/helpers.yup"

test("extract yup errors", () => {
    let schema = yup.object().shape({
        firstName: yup.string().required(),
        age: yup.number().required(),
    })

    const result = extractYupErrors(validate({}, schema))

    expect(result).toStrictEqual({
        firstName: "firstName is a required field",
        age: "age is a required field",
    })
})

test("extract yup global error", () => {
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

    const result = extractYupErrors(validate({}, schema))

    expect(result).toStrictEqual({
        __global: "one of firstName and age should have a value",
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

    const values = {
        address: [{ street: "5th avenue" }, { city: "Los Angeles" }],
    }
    const result = extractYupErrors(validate(values, schema))

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

    const values = {
        address: [{ street: ["5th", "avenue", ""] }],
    }
    const result = extractYupErrors(validate(values, schema))

    expect(result).toStrictEqual({
        "address.0.city": "address.city is a required field",
        "address.0.street.2": "address.street is a required field",
    })
})

test("yup errors without a path", async () => {
    let schema = yup.object().shape({
        firstName: yup.string().required,
    })

    try {
        extractYupErrors(validate([], schema))
    } catch (err) {
        expect(err.toString()).toMatch(
            /ValidationError.*cast from the value.*\[\]/,
        )
    }
})

function validate(value, schema) {
    try {
        schema.validateSync(value, { abortEarly: false })
        return null
    } catch (error) {
        return error
    }
}
