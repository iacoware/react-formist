const openBracketRegEx = /\[/g
const closeBracketRegEx = /\]/g
const arrayIndexRegEx = /\[\d+\]/g

const adaptPath = path =>
    path.replace(openBracketRegEx, ".").replace(closeBracketRegEx, "")
const adaptMessage = msg => msg.replace(arrayIndexRegEx, "")

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
