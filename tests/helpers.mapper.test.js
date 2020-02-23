/*globals test, expect*/
import deepmerge from "deepmerge"

const head = arr => arr[0]
const tail = arr => arr.slice(1)

const mapEntryToObj = entry => {
    const [name, value] = entry

    const parts = name.split(".")
    const reversed = parts.reverse()

    const deepest = { [head(reversed)]: value }
    const withoutDeepest = tail(reversed)
    const result = withoutDeepest.reduce((acc, cur) => {
        return { [cur]: acc }
    }, deepest)

    return result
}

const mapPropsToObj = values => {
    const entries = Object.entries(values)

    const results = entries
        .map(entry => mapEntryToObj(entry))
        .reduce((acc, cur) => deepmerge(acc, cur), {})

    return results
}

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
