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
    const initialValues = {
        name: "Avengers: EndGame",
        releases: [
            { location: "Los Angeles", date: "2019-04-22" },
            { location: "New York", date: "2019-04-26" },
        ],
    }
    const formist = useFormist(initialValues, { schema: movieSchema, onSubmit })

    return (
        <form {...formist.form()}>
            <div>
                <input type="text" {...formist.field("name")} />
                <span className="validation-error">
                    {formist.error("name")}
                </span>
            </div>

            <div>
                {formist.values.releases.map((release, index) => {
                    return (
                        <div key={index}>
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
