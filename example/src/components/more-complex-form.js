import React from "react"
import * as yup from "yup"
import useFormist from "../../../src/useFormist"

const releaseSchema = yup.object().shape({
    location: yup.string().required(),
    date: yup.date().required(),
})
const movieSchema = yup.object().shape({
    name: yup.string().required(),
    releases: yup.array().of(releaseSchema),
})

function TextField({ value, onChange, error }) {
    return (
        <>
            <input type="text" value={value} onChange={onChange} />
            <span className="validation-error">{error}</span>
        </>
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
                <TextField {...formist.field("name")} />
            </div>

            <div>
                {data.releases.map((release, index) => (
                    <div key={release.id}>
                        <span>{release.id} - </span>
                        <TextField
                            {...formist.field(`releases.${index}.location`)}
                        />
                        <TextField
                            {...formist.field(`releases.${index}.date`)}
                        />
                    </div>
                ))}
            </div>
            <button {...formist.submitButton()}>Submit</button>
        </form>
    )
}
