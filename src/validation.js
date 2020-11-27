import { extractYupErrors, isYupError, toYupPath } from "./helpers.yup"

export async function invokeStandardValidation(options, values, path) {
    if (!options.onValidate) return

    return await options.onValidate(values, path)
}

export async function invokeYupValidation(options, values, path) {
    if (!options.schema) return

    const err = await validate(options, values, path)
    if (err) return extractYupErrors(err)
}

async function validate(options, values, path) {
    const schemaOptions = { abortEarly: false }

    try {
        if (path) {
            await options.schema.validateAt(
                toYupPath(path),
                values,
                schemaOptions,
            )
        } else {
            await options.schema.validate(values, schemaOptions)
        }
    } catch (err) {
        if (!isYupError(err)) throw err
        return Promise.resolve(err)
    }
}
