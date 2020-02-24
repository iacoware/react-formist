import deepmerge from "deepmerge"

export const safeFn = fn => (...args) => (fn ? fn(...args) : undefined)

export function isObject(obj) {
    return obj !== null && obj !== undefined && obj.constructor === Object
}

export function isEmpty(obj) {
    return isObject(obj) && Object.entries(obj).length === 0
}

export const head = arr => arr[0]
export const tail = arr => arr.slice(1)
export const isInteger = text => !isNaN(parseInt(text, 10))
export const mergeAll = objs =>
    objs.reduce((acc, cur) => deepmerge(acc, cur), {})

export function extractYupErrors(yupError) {
    if (typeof yupError !== "object" || !yupError.inner) return {}

    const errors = {}
    for (const err of yupError.inner) {
        if (!errors[err.path]) {
            errors[err.path] = err.message
        }
    }

    return errors
}
