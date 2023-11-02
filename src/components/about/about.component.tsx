import React from "react";

const About = (props: any) => {
    const frontEndThingsTodo = [
        "Create the play functionality... almost done need to answer below",
        "What happens when users get correct answer? Get another one? Go back to play? View Algorithm of choice?",
        "How to even animate math algorithms? Manim? p5?",
        "Start doing research into Mental Math and different Algorithms -- fun part but want to get basic functionality first",
        "Make Clock pretty low priority, who cares",
        "Login bug -- prolly some setState nonsense",
    ]

    const backEndThingsTodo = [
        "Lets start connecting to the database sending over results from runs",
        "Expose API that gives us information on All Users and their Streaks",
        "Expose API that gives us information on Single User and all their runs for graphs",
        "Figure out how to have users signed in and whenever they complete a run it sends to backend"
    ]

    const otherThingsTodo = [
        "host it on an AWS server",
        "create bot that advertises it",
        "create bot that emails school districts advertising it",
        "make it sound cool on resume"
    ]

    return (
        <div>
            <h1>Todo for now</h1>
            <h2>front end</h2>
            <ol>
                {frontEndThingsTodo.map((todo) => <li key={todo}> {todo} </li>)}
            </ol>
            <br/>
            <h2>back end</h2>
            <ol>
                {backEndThingsTodo.map((todo) => <li key={todo}> {todo} </li>)}
            </ol>
            <br/>
            <h2>other end</h2>
            <ol>
                {otherThingsTodo.map((todo) => <li key={todo}> {todo} </li>)}
            </ol>
        </div>
    )
}

export default About;
