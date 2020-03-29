import React, { useState } from "react"
import SimpleForm from "./simple-form"
import YupForm from "./yup-form"
import MoreComplexForm from "./more-complex-form"

function ShowForm({ title, component }) {
    const [values, setValues] = useState({})
    const onSubmit = formValues => {
        console.log(title, formValues)
        setValues(formValues)
    }

    return (
        <div className="show-form panel is-success">
            <p className="panel-heading">{title}</p>

            <div className="panel-block columns">
                <div className="column is-half">{component({ onSubmit })}</div>
                <div className="column is-half codeblock">
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                </div>
            </div>
        </div>
    )
}

const App = () => {
    return (
        <div className="section">
            <div className="container">
                <h1 className="title">React-formist examples</h1>

                <ShowForm title="Simple form" component={SimpleForm} />
                <ShowForm title="Yup form" component={YupForm} />
                <ShowForm
                    title="More complex form"
                    component={MoreComplexForm}
                />
            </div>
        </div>
    )
}

export default App
