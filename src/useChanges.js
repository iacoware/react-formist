import { useState } from "react"
import { getPath, setPath } from "./mapper"

const useChangeTracking = initialValues => {
    const [values, setValues] = useState(initialValues)

    const getValue = name => getPath(name, values) || ""

    const change = (path, value) =>
        setValues(prev => setPath(path, value, prev))

    return {
        values,
        getValue,
        change,
    }
}

export default useChangeTracking
