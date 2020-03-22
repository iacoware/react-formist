const initialOpenBracketRegEx = /^\[/g
const middleOpenBracketRegEx = /\[/g
const closeBracketRegEx = /\]/g
const arrayIndexRegEx = /\[\d+\]/g

const toRegEx = {
    initialIndex: /^(\d+)/g,
    middleIndex: /\.(\d+)/g,
}

const adaptMessage = msg => msg.replace(arrayIndexRegEx, "")

export const isYupError = error => {
    return typeof error === "object" && !!error.inner
}

export const fromYupPath = path =>
    path
        .replace(initialOpenBracketRegEx, "")
        .replace(middleOpenBracketRegEx, ".")
        .replace(closeBracketRegEx, "")

export const toYupPath = path =>
    path
        .replace(toRegEx.initialIndex, "[$1]")
        .replace(toRegEx.middleIndex, "[$1]")

export function extractYupErrors(yupError) {
    if (!isYupError(yupError)) return {}

    const errors = {}
    for (const err of yupError.inner) {
        if (!err.path) throw yupError

        const path = fromYupPath(err.path)
        const message = adaptMessage(err.message)
        if (!errors[path]) {
            errors[path] = message
        }
    }

    return errors
}
