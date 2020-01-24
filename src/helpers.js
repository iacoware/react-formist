export function isObject(obj) {
    return obj !== null && obj !== undefined && obj.constructor === Object
}

export function isEmpty(obj) {
    return isObject(obj) && Object.entries(obj).length === 0
}

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
