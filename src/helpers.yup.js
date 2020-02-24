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
