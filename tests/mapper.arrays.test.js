/*globals test, expect*/
import { mapIndexesToArray } from "../src/mapper"

test("strings array", () => {
    const obj = {
        0: "New York",
        1: "Los Angeles",
    }
    const expected = ["New York", "Los Angeles"]

    const result = mapIndexesToArray(obj)

    expect(result).toStrictEqual(expected)
})

test("object array", () => {
    const obj = {
        0: { city: "New York" },
        1: { city: "Los Angeles" },
    }
    const expected = [{ city: "New York" }, { city: "Los Angeles" }]

    const result = mapIndexesToArray(obj)

    expect(result).toStrictEqual(expected)
})

test("object array, nested", () => {
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

test("object array, double nested", () => {
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
