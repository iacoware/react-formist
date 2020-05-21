import { useState, useCallback } from "react"
import { isObject, isEmpty } from "./helpers"
import { getPath, setPath } from "./mapper"
import { invokeStandardValidation, invokeYupValidation } from "./validation"

const hasErrors = (errs) => isObject(errs) && !isEmpty(errs)

const useValidation = (options) => {
    const [errors, setErrors] = useState({})

    const getError = (path) => getPath(path, errors) || ""

    const validate = async (values, path) => {
        if (hasErrors(errors)) clearErrors(path)

        const errs1 = await invokeStandardValidation(options, values, path)
        if (errs1) {
            applyErrors(errs1)
            return errs1
        }

        const errs2 = await invokeYupValidation(options, values, path)
        if (errs2) {
            applyErrors(errs2)
            return errs2
        }
    }

    const isValid = (path) => (path ? !getError(path) : isEmpty(errors))

    const setError = (path, message) =>
        setErrors((prev) => setPath(path, message, prev))

    const applyErrors = (errors) => {
        Object.keys(errors).forEach((path) => setError(path, errors[path]))
    }

    const clearErrors = (path) => {
        if (path) setError(path, "")
        else setErrors({})
    }

    return {
        validate,
        isValid,
        getError,
        setError: useCallback(setError, []),
        errors,
    }
}

export default useValidation
