import { useState } from "react"
import { safeFn, isObject, isEmpty, extractYupErrors } from "./helpers"

const hasErrors = errs => isObject(errs) && !isEmpty(errs)

const useFormist = (initialValues, options) => {
    initialValues = initialValues || {}
    options = options || {}
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})

    const getValue = name => values[name] || ""
    const getError = name => errors[name] || ""
    const optionsOnSubmit = safeFn(options.onSubmit)

    const validate = async () => {
        //Maybe would be a better fit?
        const errs1 = await invokeOptionalValidation(options, values)
        if (errs1) {
            setErrors(errs1)
            return errs1
        }

        const errs2 = await invokeYupValidation(options, values)
        if (errs2) {
            setErrors(errs2)
            return errs2
        }
    }

    const submit = async () => {
        const errs = await validate()
        if (hasErrors(errs)) return

        await optionsOnSubmit(values)
        return values
    }

    const isArray = name => name[0] === "["
    const arrayIndex = name => parseInt(name.slice(1).slice(0, -1))

    const change = (name, value) => {
        if (isArray(name))
            return setValues(prev => {
                const newValues = [...prev]
                newValues[arrayIndex(name)] = value
                return newValues
            })
        else return setValues(prev => ({ ...prev, [name]: value }))
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
        submit,
        change,
        getFieldProps: field, //formal alias
        getFormProps: form, // formal alias
        getSubmitButtonProps: submitButton, // formal alias
    }
}

async function invokeOptionalValidation(options, values) {
    if (options.onValidate) {
        const errs = await options.onValidate(values)
        return errs
    }
}

async function invokeYupValidation(options, values) {
    if (options.yupSchema) {
        try {
            await options.yupSchema.validate(values, {
                abortEarly: false,
            })
        } catch (yupError) {
            const errs = extractYupErrors(yupError)
            return errs
        }
    }
}

export default useFormist
