import { safeFn, isObject, isEmpty } from "./helpers"
import useChanges from "./useChanges"
import useValidation from "./useValidation"

const hasErrors = (errs) => isObject(errs) && !isEmpty(errs)

const useFormist = (initialValues, options) => {
    initialValues = initialValues || {}
    options = options || {}
    options.validationMode = options.validationMode || "blur"
    const optionsOnSubmit = safeFn(options.onSubmit)

    const changes = useChanges(initialValues)
    const validation = useValidation(options)
    const isValidationMode = (mode) => options.validationMode === mode

    const validate = () => validation.validate(changes.values)

    const submit = async () => {
        const errs = await validation.validate(changes.values)
        if (hasErrors(errs)) return
        await optionsOnSubmit(changes.values)
        return changes.values
    }

    const field = (path) => ({
        name: path,
        value: changes.getValue(path),
        error: validation.getError(path),
        onChange(e) {
            changes.touch(path, e.target.value)
        },
        onBlur() {
            if (isValidationMode("blur") && changes.isTouched(path))
                validation.validate(changes.values, path)
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
        touch: changes.touch,
        isChanged: changes.isTouched,
        isTouched: changes.isTouched,
        errors: validation.errors,
        error: validation.getError,
        setError: validation.setError,
        isValid: validation.isValid,
        validate: validate,
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
