/*globals test, expect*/
import useFormist from "../src/useFormist"

const head = arr => arr[0]
const tail = arr => arr.slice(1)

const mapPropsToObj = values => {
    const entries = Object.entries(values)
    const entry = entries[0]
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

test("one element", () => {
    const values = { "first.second.third": 42 }
    console.log(Object.entries(values))

    const result = mapPropsToObj(values)

    expect(result).toStrictEqual({ first: { second: { third: 42 } } })
})
