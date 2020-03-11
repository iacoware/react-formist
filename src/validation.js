import { extractYupErrors, isYupError } from "./helpers.yup"

export async function invokeStandardValidation(options, values) {
    if (!options.onValidate) return

    return await options.onValidate(values)
}

export async function invokeYupValidation(options, values) {
    if (!options.schema) return

    try {
        await options.schema.validate(values, { abortEarly: false })
    } catch (err) {
        if (!isYupError(err)) throw err
        return extractYupErrors(err)
    }
}