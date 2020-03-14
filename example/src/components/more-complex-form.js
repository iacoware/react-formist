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

export default function MoreComplexForm({ onSubmit }) {
    const data = {
        releases: [{ id: 1 }, { id: 2 }, { id: 3 }],
    }
    const formist = useFormist({}, { schema: movieSchema, onSubmit })

    return (
        <form {...formist.form()}>
            <div>
                <input type="text" {...formist.field("name")} />
                <span className="validation-error">
                    {formist.error("name")}
                </span>
            </div>

            <div>
                {data.releases.map((release, index) => {
                    return (
                        <div key={release.id}>
                            <span>{release.id} - </span>
                            <input
                                type="text"
                                {...formist.field(`releases.${index}.location`)}
                            />
                            <span className="validation-error">
                                {formist.error(`releases.${index}.location`)}
                            </span>
                            <input
                                type="text"
                                {...formist.field(`releases.${index}.date`)}
                            />
                            <span className="validation-error">
                                {formist.error(`releases.${index}.date`)}
                            </span>
                        </div>
                    )
                })}
            </div>
            <button {...formist.submitButton()}>Submit</button>
        </form>
    )
}
