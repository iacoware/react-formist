//prettier-ignore
import { isObject, isInteger, head, tail, last, mergeAll, deepClone } from "./helpers"

const createObj = (name, value) => ({ [name]: value })

export const getPath = (path, obj) => {
    const parts = path.split(".")

    let current = obj
    parts.forEach(part => {
        current = current[part]
    })
    return current
}

export const setPath = (path, value, obj) => {
    const newObj = deepClone(obj)

    const parts = path.split(".")
    const partsMinusLast = parts.slice(0, -1)
    let current = newObj
    partsMinusLast.forEach((part, index) => {
        const nextPart = parts[index + 1]
        const mustBeAnArray = isInteger(nextPart)

        if (!current[part]) {
            if (mustBeAnArray) current[part] = []
            else current[part] = {}
        }
        current = current[part]
    })
    current[last(parts)] = value

    return newObj
}

export const mapEntryToObj = (name, value) => {
    const parts = name.split(".")
    const reversed = parts.reverse()

    const deepest = createObj(head(reversed), value)
    const deepestLess = tail(reversed)
    return deepestLess.reduce((acc, cur) => createObj(cur, acc), deepest)
}

export const mapPropsToObj = flatObj => {
    const props = Object.entries(flatObj).map(([name, value]) =>
        mapEntryToObj(name, value),
    )
    return mergeAll(props)
}

export const mapIndexesToArray = obj => {
    if (!isObject(obj)) return obj

    const keys = Object.keys(obj)
    if (!keys.length) return obj

    if (isInteger(keys[0])) {
        return Object.values(obj).map(value => mapIndexesToArray(value))
    }

    const propsAsObj = Object.entries(obj).map(([name, value]) => ({
        [name]: mapIndexesToArray(value),
    }))

    return mergeAll(propsAsObj)
}

export const unflatten = flatObj => {
    const unflattened = mapPropsToObj(flatObj)
    const unmapped = mapIndexesToArray(unflattened)
    return unmapped
}

export const unflattenNameValue = (name, value) => {
    const unflattened = mapEntryToObj(name, value)
    const unmapped = mapIndexesToArray(unflattened)
    return unmapped
}
