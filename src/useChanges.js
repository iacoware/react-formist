import { useState, useCallback } from "react"
import { getPath, setPath } from "./mapper"
import { isEmpty } from "./helpers"

const useChangeTracking = (initialValues) => {
    initialValues = initialValues || {}
    const [values, setValues] = useState(initialValues)
    const [touched, setTouched] = useState({})

    const getValue = (path) => getPath(path, values) || ""

    const change = (path, value) => {
        return setValues((prev) => setPath(path, value, prev))
    }

    const touch = (path, value) => {
        setTouched((prev) => ({ ...prev, ...{ [path]: true } }))
        return change(path, value)
    }

    const isTouched = (path) => {
        if (path) return !!touched[path]
        else return !isEmpty(touched)
    }

    return {
        values,
        getValue: getValue,
        change: useCallback(change, []),
        touch: useCallback(touch, []),
        isTouched: isTouched,
    }
}

export default useChangeTracking
