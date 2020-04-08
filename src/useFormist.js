import { safeFn, isObject, isEmpty } from "./helpers"
import useChanges from "./useChanges"
import useValidation from "./useValidation"

const hasErrors = errs => isObject(errs) && !isEmpty(errs)

const useFormist = (initialValues, options) => {
    initialValues = initialValues || {}
    options = options || {}
    options.validationMode = options.validationMode || "blur"
    const optionsOnSubmit = safeFn(options.onSubmit)

    const changes = useChanges(initialValues)
    const validation = useValidation(changes.values, options)
    const isValidationMode = mode => options.validationMode === mode

    const submit = async () => {
        const errs = await validation.validate()
        if (hasErrors(errs)) return
        await optionsOnSubmit(changes.values)
        return changes.values
    }

    const field = path => ({
        name: path,
        value: changes.getValue(path),
        error: validation.getError(path),
        onChange(e) {
            changes.change(path, e.target.value)
        },
        onBlur() {
            if (isValidationMode("blur") && changes.isChanged(path))
                validation.validate(path)
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
        isChanged: changes.isChanged,
        errors: validation.errors,
        error: validation.getError,
        setError: validation.setError,
        isValid: validation.isValid,
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
