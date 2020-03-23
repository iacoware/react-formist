import { extractYupErrors, isYupError, toYupPath } from "./helpers.yup"

export async function invokeStandardValidation(options, values, name) {
    if (!options.onValidate) return

    return await options.onValidate(values, name)
}

export async function invokeYupValidation(options, values, name) {
    if (!options.schema) return

    const err = await validate(options, values, name)
    if (err) return extractYupErrors(err)
}

async function validate(options, values, name) {
    const schemaOptions = { abortEarly: false }

    try {
        if (name) {
            await options.schema.validateAt(
                toYupPath(name),
                values,
                schemaOptions,
            )
        } else {
            await options.schema.validate(values, schemaOptions)
        }
    } catch (err) {
        if (!isYupError(err)) throw err
        return err
    }
}
