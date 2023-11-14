import React from "react";

const About = (props: any) => {
    const frontEndThingsTodo = [
        "Figure out how to have users signed in and whenever they complete a run it sends to backend",
        "How to even animate math algorithms? Manim? p5?",
        "Start doing research into Mental Math and different Algorithms -- fun part but want to get basic functionality first",
        "Make Clock pretty low priority, who cares",
    ]

    const backEndThingsTodo = [
        "Expose API that gives us information on All Users and their Streaks",
        "Expose API that gives us information on Single User and all their runs for graphs",
    ]

    const otherThingsTodo = [
        "host it on an AWS server",
        "create bot that advertises it",
        "create bot that emails school districts advertising it",
        "make it sound cool on resume"
    ]

    const bugs = [
        "Login bug -- prolly some setState nonsense. yup needed to check in useEffect",
        "TryAgain bug -- enter correct answer, click try again, enter same number notice that it fails... have to enter, backspace, reenter to work",
        "TimeElapsed bug -- just doesnt really seem right tbh. Not getting correct numbers lol"
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
            <h2>bugs</h2>
            <ol>
                {bugs.map((todo) => <li key={todo}> {todo} </li>)}
            </ol>
        </div>
    )
}

export default About;
