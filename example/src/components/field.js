import React from "react"

// NOTE: it's just a styling component, it doesn't add any behavior

export default function Field({ label, children }) {
    const input = React.Children.toArray(children)[0]
    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control">{addCssProps(input)}</div>
            <p className="help is-danger">{input.props.error}</p>
        </div>
    )
}

function addCssProps(input) {
    return React.cloneElement(input, { className: "input" })
}
