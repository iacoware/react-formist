import { useState } from "react"
import { getPath, setPath } from "./mapper"

const useChangeTracking = initialValues => {
    initialValues = initialValues || {}
    const [values, setValues] = useState(initialValues)
    const [changed, setChanged] = useState({})

    const getValue = name => getPath(name, values) || ""

    const change = (path, value) => {
        setChanged(prev => ({ ...prev, ...{ [path]: true } }))
        return setValues(prev => setPath(path, value, prev))
    }

    const isChanged = path => {
        return !!changed[path]
    }

    return {
        values,
        getValue,
        change,
        isChanged,
    }
}

export default useChangeTracking
