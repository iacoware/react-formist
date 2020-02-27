const adaptPath = path => path.replace("[", ".").replace("]", "")
const adaptMessage = msg => msg.replace(/\[\d+\]/g, "")

export function extractYupErrors(yupError) {
    if (typeof yupError !== "object" || !yupError.inner) return {}

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
