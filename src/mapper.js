//prettier-ignore
import { isInteger, last, deepClone } from "./helpers"

export const getPath = (path, obj) => {
    const parts = path.split(".")

    let current = obj
    for (const part of parts) {
        if (current[part] === undefined) return null
        current = current[part]
    }
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
