import React from "react"

// NOTE: it's just a styling component, it doesn't add any behavior

export default function Field({ label, children }) {
    const childrenArray = React.Children.toArray(children)
    const inputWithStyles = addProps(childrenArray[0])
    const validationError = childrenArray[1]
    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control">{inputWithStyles}</div>
            <p className="help is-danger">{validationError}</p>
        </div>
    )
}

function addProps(input) {
    return React.cloneElement(input, { className: "input" })
}
