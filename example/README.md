# Formist example

Run the example

`npm start` should open `http://localhost:1234`

## Usage

#### Simple form

```js
function SimpleForm({ onSubmit }) {
    const initialValues = { firstName: "Kent", lastName: "Beck"}
    const formist = useFormist(initialValues, { onSubmit })

    return (
        <form {...formist.form()}>
            <div>
                <input type="text" {...formist.field("firstName")} />
            </div>
            <div>
                <input type="text" {...formist.field("lastName")} />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
```

#### Form with [Yup](https://github.com/jquense/yup) validation

```js
function YupForm({ onSubmit }) {
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
    })
    const formist = useFormist({}, { schema, onSubmit })

    return (
        <form {...formist.form()}>
            <div>
                <input type="text" {...formist.field("firstName")} />
                <span className="validation-error">{formist.errors.firstName}</span>
            </div>
            <div>
                <input type="text" {...formist.field("lastName")} />
                <span className="validation-error">{formist.errors.lastName}</span>
            </div>
            <button {...formist.submitButton()}>Submit</button>
        </form>
    )
```

#### More Complex form

```js
function MoreComplexForm({ onSubmit }) {
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
```
