import { safeFn, isObject, isEmpty } from "./helpers"
import useChanges from "./useChanges"
import useValidation from "./useValidation"

const hasErrors = errs => isObject(errs) && !isEmpty(errs)

const useFormist = (initialValues, options) => {
    initialValues = initialValues || {}
    options = options || {}
    const optionsOnSubmit = safeFn(options.onSubmit)

    const changes = useChanges(initialValues)
    const validation = useValidation(changes.values, options)

    const submit = async () => {
        const errs = await validation.validate()
        if (hasErrors(errs)) return
        await optionsOnSubmit(changes.values)
        return changes.values
    }

    const field = name => ({
        name: name,
        value: changes.getValue(name),
        error: validation.getError(name),
        onChange(e) {
            changes.change(name, e.target.value)
        },
        onBlur(e) {
            //if (!changes.hasChanged(name)) return
            validation.validate()
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
        values: changes.values,
        change: changes.change,
        errors: validation.errors,
        error: validation.getError,
        setError: validation.setError,
        validate: validation.validate,
        field,
        form,
        submitButton,
        submit,
        getFieldProps: field, //formal alias
        getFormProps: form, // formal alias
        getSubmitButtonProps: submitButton, // formal alias
    }
}

export default useFormist
