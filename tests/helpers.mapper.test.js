/*globals test, expect*/
import { mapPropsToObj, mapIndexesToArray, unflatten } from "../src/mapper"

test("custom object arrays, flat", () => {
    const obj = {
        0: "New York",
        1: "Los Angeles",
    }
    const expected = ["New York", "Los Angeles"]

    const result = mapIndexesToArray(obj)

    expect(result).toStrictEqual(expected)
})

test("custom object arrays, one level", () => {
    const obj = {
        0: { city: "New York" },
        1: { city: "Los Angeles" },
    }
    const expected = [{ city: "New York" }, { city: "Los Angeles" }]

    const result = mapIndexesToArray(obj)

    expect(result).toStrictEqual(expected)
})

test("custom object arrays, nested", () => {
    const obj = {
        addresses: {
            0: { city: "New York" },
            1: { city: "Los Angeles" },
        },
    }
    const expected = {
        addresses: [{ city: "New York" }, { city: "Los Angeles" }],
    }

    const result = mapIndexesToArray(obj)

    expect(result).toStrictEqual(expected)
})

test("custom object arrays, double nested", () => {
    const obj = {
        addresses: {
            0: {
                city: "Firenze",
                translations: {
                    0: { lang: "en", text: "Florence" },
                    1: { lang: "es", text: "Florencia" },
                },
            },
        },
    }
    const expected = {
        addresses: [
            {
                city: "Firenze",
                translations: [
                    { lang: "en", text: "Florence" },
                    { lang: "es", text: "Florencia" },
                ],
            },
        ],
    }

    const result = mapIndexesToArray(obj)

    expect(result).toStrictEqual(expected)
})

test("one element", () => {
    const values = { "first.second.third": 42 }

    const result = mapPropsToObj(values)

    expect(result).toStrictEqual({ first: { second: { third: 42 } } })
})

test("many elements", () => {
    const values = {
        "first.second.third1": 42,
        "first.second.third2": "is",
        "first.second.third3": "the answer",
    }

    const result = mapPropsToObj(values)

    expect(result).toStrictEqual({
        first: { second: { third1: 42, third2: "is", third3: "the answer" } },
    })
})

test("primitive value arrays", () => {
    const values = {
        "customer.addresses.0": "5th avenue",
        "customer.addresses.1": "8th avenue",
    }

    const result = unflatten(values)

    expect(result).toStrictEqual({
        customer: { addresses: ["5th avenue", "8th avenue"] },
    })
})

test("custom object arrays", () => {
    const values = {
        "customer.addresses.0.street": "5th avenue",
        "customer.addresses.0.city": "New York",
    }

    const result = unflatten(values)

    expect(result).toStrictEqual({
        customer: { addresses: [{ city: "New York", street: "5th avenue" }] },
    })
})
