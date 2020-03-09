import { useState } from "react"
import { safeFn, isObject, isEmpty } from "./helpers"
import { extractYupErrors, isYupError } from "./helpers.yup"
import { getPath, setPath } from "./mapper"

const hasErrors = errs => isObject(errs) && !isEmpty(errs)

const useFormist = (initialValues, options) => {
    initialValues = initialValues || {}
    options = options || {}
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})

    const getValue = name => getPath(name, values) || ""
    const getError = name => getPath(name, errors) || ""
    const optionsOnSubmit = safeFn(options.onSubmit)

    const validate = async () => {
        if (hasErrors(errors)) clearErrors()

        //Maybe would be a better fit?
        const errs1 = await invokeOptionalValidation(options, values)
        if (errs1) {
            applyErrors(errs1)
            return errs1
        }

        const errs2 = await invokeYupValidation(options, values)
        if (errs2) {
            applyErrors(errs2)
            return errs2
        }
    }

    const submit = async () => {
        const errs = await validate()
        if (hasErrors(errs)) return
        await optionsOnSubmit(values)
        return values
    }

    const change = (path, value) =>
        setValues(prev => setPath(path, value, prev))

    const setError = (path, message) =>
        setErrors(prev => setPath(path, message, prev))

    const applyErrors = errors => {
        Object.keys(errors).forEach(path => setError(path, errors[path]))
    }

    const clearErrors = () => {
        setErrors({})
    }

    const field = name => ({
        name: name,
        value: getValue(name),
        error: getError(name),
        onChange(e) {
            change(name, e.target.value)
        },
    })

    const form = () => ({
        onSubmit(e) {
            e.preventDefault()
            return submit()
        },
    })

    const submitButton = () => ({
        onClick(e) {
            e.preventDefault()
            return submit()
        },
    })

    return {
        field,
        form,
        submitButton,
        values,
        errors,
        change,
        submit,
        error: getError,
        setError,
        getFieldProps: field, //formal alias
        getFormProps: form, // formal alias
        getSubmitButtonProps: submitButton, // formal alias
    }
}

async function invokeOptionalValidation(options, values) {
    if (!options.onValidate) return

    return await options.onValidate(values)
}

async function invokeYupValidation(options, values) {
    if (!options.schema) return

    try {
        await options.schema.validate(values, { abortEarly: false })
    } catch (err) {
        if (!isYupError(err)) throw err
        return extractYupErrors(err)
    }
}

export default useFormist
