import { useState } from "react"
import { isObject, isEmpty } from "./helpers"
import { getPath, setPath } from "./mapper"
import { invokeStandardValidation, invokeYupValidation } from "./validation"

const hasErrors = errs => isObject(errs) && !isEmpty(errs)

const useValidation = (values, options) => {
    const [errors, setErrors] = useState({})

    const getError = name => getPath(name, errors) || ""

    const validate = async name => {
        if (hasErrors(errors)) clearErrors(name)

        const errs1 = await invokeStandardValidation(options, values, name)
        if (errs1) {
            applyErrors(errs1)
            return errs1
        }

        const errs2 = await invokeYupValidation(options, values, name)
        if (errs2) {
            applyErrors(errs2)
            return errs2
        }
    }

    const setError = (path, message) =>
        setErrors(prev => setPath(path, message, prev))

    const applyErrors = errors => {
        Object.keys(errors).forEach(path => setError(path, errors[path]))
    }

    const clearErrors = path => {
        if (path) setError(path, "")
        else setErrors({})
    }

    return {
        validate,
        getError,
        setError,
        errors,
    }
}

export default useValidation
