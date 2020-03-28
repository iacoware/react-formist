import React from "react"

// NOTE: it's just a styling component, it doesn't add any behavior

export default function Field({ label, children }) {
    const inputWithStyles = React.cloneElement(children, { className: "input" })
    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control">{inputWithStyles}</div>
        </div>
    )
}
