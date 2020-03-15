import { useState } from "react"
import { getPath, setPath } from "./mapper"

const useChangeTracking = initialValues => {
    initialValues = initialValues || {}
    const [values, setValues] = useState(initialValues)

    const getValue = name => getPath(name, values) || ""

    const change = (path, value) =>
        setValues(prev => setPath(path, value, prev))

    const isChanged = path => true

    return {
        values,
        getValue,
        change,
        isChanged,
    }
}

export default useChangeTracking
