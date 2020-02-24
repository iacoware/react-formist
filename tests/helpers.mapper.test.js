/*globals test, expect*/
import deepmerge from "deepmerge"
import { isObject } from "../src/helpers"

const head = arr => arr[0]
const tail = arr => arr.slice(1)
const isArrayFromName = name => !!name.match(/(\w*)\[(\d+)\]/)
const indexFromName = name =>
    name.match(/(?<prop>\w*)\[(?<index>\d+)\]/).groups.index
const propFromName = name =>
    name.match(/(?<prop>\w*)\[(?<index>\d+)\]/).groups.prop

const createObjWith = (name, value) => {
    if (isArrayFromName(name)) {
        const propName = propFromName(name)
        return { [propName]: [value] }
    } else {
        return { [name]: value }
    }
}

const mapEntryToObj = entry => {
    const [name, value] = entry

    const parts = name.split(".")
    const reversed = parts.reverse()

    const deepest = createObjWith(head(reversed), value)
    const withoutDeepest = tail(reversed)
    const result = withoutDeepest.reduce(
        (acc, cur) => createObjWith(cur, acc),
        deepest,
    )

    return result
}

const mapPropsToObj = values => {
    const entries = Object.entries(values)

    const results = entries
        .map(entry => mapEntryToObj(entry))
        .reduce((acc, cur) => deepmerge(acc, cur), {})

    return results
}

const isNum = text => !isNaN(parseInt(text))

const mapIndexesToArray = obj => {
    if (!isObject(obj)) return obj

    const keys = Object.keys(obj)
    if (!keys.length) return obj

    if (isNum(keys[0])) {
        return Object.values(obj).map(value => mapIndexesToArray(value))
    }

    return Object.entries(obj)
        .map(([name, value]) => {
            return { [name]: mapIndexesToArray(value) }
        })
        .reduce((acc, cur) => deepmerge(acc, cur), {})
}

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
        "customer.addresses[0]": "5th avenue",
        "customer.addresses[1]": "8th avenue",
    }

    const result = mapPropsToObj(values)

    expect(result).toStrictEqual({
        customer: { addresses: ["5th avenue", "8th avenue"] },
    })
})

test.skip("custom object arrays", () => {
    const values = {
        "customer.addresses.0.street": "5th avenue",
        "customer.addresses.0.city": "New York",
    }

    const result = mapPropsToObj(values)

    expect(result).toStrictEqual({
        customer: { addresses: [{ city: "New York", street: "5th avenue" }] },
    })
})
