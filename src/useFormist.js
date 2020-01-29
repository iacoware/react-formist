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

    const change = (name, value) =>
        setValues(prev => ({ ...prev, [name]: value }))

    const fieldProps = name => ({
        name: name,
        value: getValue(name),
        error: getError(name),
        onChange(e) {
            change(name, e.target.value)
        },
    })

    const formProps = () => ({
        onSubmit(e) {
            e.preventDefault()
            return submit()
        },
    })

    return {
        fieldProps,
        formProps,
        values,
        errors,
        submit,
        change,
        getFieldProps: fieldProps, //formal alias
        getFormProps: formProps, // formal alias
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
