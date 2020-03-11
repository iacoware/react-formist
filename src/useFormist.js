import { useState } from "react"
import { safeFn, isObject, isEmpty } from "./helpers"
import { getPath, setPath } from "./mapper"
import useValidation from "./useValidation"

const hasErrors = errs => isObject(errs) && !isEmpty(errs)

const useFormist = (initialValues, options) => {
    initialValues = initialValues || {}
    options = options || {}
    const [values, setValues] = useState(initialValues)
    const { errors, getError, setError, validate } = useValidation(
        values,
        options,
    )

    const getValue = name => getPath(name, values) || ""
    const optionsOnSubmit = safeFn(options.onSubmit)

    const submit = async () => {
        const errs = await validate()
        if (hasErrors(errs)) return
        await optionsOnSubmit(values)
        return values
    }

    const change = (path, value) =>
        setValues(prev => setPath(path, value, prev))

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
        validate,
        error: getError,
        setError,
        getFieldProps: field, //formal alias
        getFormProps: form, // formal alias
        getSubmitButtonProps: submitButton, // formal alias
    }
}

export default useFormist
