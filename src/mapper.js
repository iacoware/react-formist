import deepmerge from "deepmerge"
import { isObject, isInteger, head, tail } from "./helpers"

const createObj = (name, value) => ({ [name]: value })

export const mapEntryToObj = entry => {
    const [name, value] = entry

    const parts = name.split(".")
    const reversed = parts.reverse()

    const deepest = createObj(head(reversed), value)
    const withoutDeepest = tail(reversed)
    const result = withoutDeepest.reduce(
        (acc, cur) => createObj(cur, acc),
        deepest,
    )

    return result
}

export const mapPropsToObj = values => {
    const entries = Object.entries(values)

    const results = entries
        .map(entry => mapEntryToObj(entry))
        .reduce((acc, cur) => deepmerge(acc, cur), {})

    return mapIndexesToArray(results)
}

export const mapIndexesToArray = obj => {
    if (!isObject(obj)) return obj

    const keys = Object.keys(obj)
    if (!keys.length) return obj

    if (isInteger(keys[0])) {
        return Object.values(obj).map(value => mapIndexesToArray(value))
    }

    return Object.entries(obj)
        .map(([name, value]) => {
            return { [name]: mapIndexesToArray(value) }
        })
        .reduce((acc, cur) => deepmerge(acc, cur), {})
}
