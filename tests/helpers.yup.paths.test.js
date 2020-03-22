/*globals test, expect*/
import * as yup from "yup"
import { fromYupPath } from "../src/helpers.yup"

test("simple paths", () => {
    expect(fromYupPath("name")).toBe("name")
})

test("nested paths", () => {
    expect(fromYupPath("name.age")).toBe("name.age")
})

test("array paths", () => {
    expect(fromYupPath("[0]")).toBe("0")
    expect(fromYupPath("name[0]")).toBe("name.0")
    expect(fromYupPath("name[0][1]")).toBe("name.0.1")
    expect(fromYupPath("name[0][1].second")).toBe("name.0.1.second")
})

test.skip("extract yup errors on arrays", () => {
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

test.skip("extract yup errors on nested arrays", () => {
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
