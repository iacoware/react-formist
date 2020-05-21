import { useState, useCallback } from "react"
import { getPath, setPath } from "./mapper"
import { isEmpty } from "./helpers"

const useChangeTracking = (initialValues) => {
    initialValues = initialValues || {}
    const [values, setValues] = useState(initialValues)
    const [changed, setChanged] = useState({})

    const getValue = (path) => getPath(path, values) || ""

    const change = (path, value) => {
        setChanged((prev) => ({ ...prev, ...{ [path]: true } }))
        return setValues((prev) => setPath(path, value, prev))
    }

    const isChanged = (path) => {
        if (path) return !!changed[path]
        else return !isEmpty(changed)
    }

    return {
        values,
        getValue: getValue,
        change: useCallback(change, []),
        isChanged: isChanged,
    }
}

export default useChangeTracking
