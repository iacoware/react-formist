import React from "react"
import * as yup from "yup"
import Field from "./field"
import useFormist from "../../../src/useFormist"

const releaseSchema = yup.object().shape({
    location: yup.string().required(),
    date: yup.date().required(),
})
const movieSchema = yup.object().shape({
    name: yup.string().required(),
    releases: yup.array().of(releaseSchema),
})

function InlineField({ label, children }) {
    return (
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">{label}</label>
            </div>
            <div className="field-body">
                {React.Children.map(children, input => (
                    <div className="field">
                        <div className="control">{addCssProps(input)}</div>
                        <p className="help is-danger">{input.props.error}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function MoreComplexForm({ onSubmit }) {
    const data = {
        releases: [{ id: 1 }, { id: 2 }, { id: 3 }],
    }
    const formist = useFormist({}, { schema: movieSchema, onSubmit })

    return (
        <form {...formist.form()}>
            <div>
                <Field label="Name">
                    <input type="text" {...formist.field("name")} />
                    <span>{formist.error("name")}</span>
                </Field>
            </div>

            <div>
                {data.releases.map((release, index) => (
                    <div key={release.id}>
                        <InlineField label={`Release ${release.id}`}>
                            <input
                                type="text"
                                placeholder="location"
                                {...formist.field(`releases.${index}.location`)}
                            />
                            <input
                                type="text"
                                placeholder="date"
                                {...formist.field(`releases.${index}.date`)}
                            />
                        </InlineField>
                    </div>
                ))}
            </div>

            <button className="button is-primary" {...formist.submitButton()}>
                Submit
            </button>
        </form>
    )
}

function addCssProps(input) {
    return React.cloneElement(input, { className: "input" })
}
