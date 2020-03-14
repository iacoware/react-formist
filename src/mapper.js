//prettier-ignore
import { isInteger, isObject, isNull, last, deepClone } from "./helpers"

export const getPath = (path, obj) => {
    const parts = path.split(".")

    let current = obj
    for (const part of parts) {
        if (isNull(current) || isNull(current[part])) return null
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
        checkType(current, part, newObj)

        const nextPart = parts[index + 1]
        const mustBeAnArray = isInteger(nextPart)

        if (isNull(current[part])) {
            if (mustBeAnArray) current[part] = []
            else current[part] = {}
        }
        current = current[part]
    })

    checkType(current, last(parts), newObj)
    current[last(parts)] = value

    return newObj
}

const checkType = (objOrArray, part, wholeTarget) => {
    const error =
        (Array.isArray(objOrArray) && !isInteger(part)) ||
        (isObject(objOrArray) && isInteger(part))

    if (error) {
        const targetString = JSON.stringify(wholeTarget, null, 2)
        const msg = `Type mismatch between target type and property\nProperty: '${part}'\nTarget: ${targetString}`
        throw new Error(msg)
    }
}
