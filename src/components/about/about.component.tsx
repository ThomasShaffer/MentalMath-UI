import React from "react";

const About = (props: any) => {
    const thingsTodo = [
        "Login bug",
        "Create the play functionality",
        "Move the header into some drop down type stuff",
        "Start doing research into Mental Math and different Algorithms"
    ]

    return (
        <div>
            <h1>About section</h1>
            <ol>
                {thingsTodo.map((todo) => <li key={todo}> {todo} </li>)}
            </ol>
        </div>
    )
}

export default About;