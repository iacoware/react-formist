const adaptPath = path => path.replace(/\[/g, ".").replace(/\]/g, "")
const adaptMessage = msg => msg.replace(/\[\d+\]/g, "")

export const isYupError = error => {
    return typeof error === "object" && !!error.inner
}

export function extractYupErrors(yupError) {
    if (!isYupError(yupError)) return {}

    const errors = {}
    for (const err of yupError.inner) {
        const path = adaptPath(err.path)
        const message = adaptMessage(err.message)
        if (!errors[path]) {
            errors[path] = message
        }
    }

    return errors
}
