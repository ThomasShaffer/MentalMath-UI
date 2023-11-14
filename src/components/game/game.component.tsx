import {Button, ButtonGroup, Form, InputGroup, Spinner, Stack} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import Navbar from "../shared/nav-bar/navbar.component";
import {SyntheticEvent, useEffect, useReducer, useState} from "react";
import {Clock} from "./helpers/clock.component";
import {FinishedDialog} from "./helpers/finishedDialog.component";
import {ErrorAnswer} from "../shared/error/ErrorAnswer";

const Game = (props: any) => {
    const navigate = useNavigate();
    const state = useLocation().state;

    const [error, setError] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [timeStart, setTimeStart] = useState(new Date().getTime());
    const [timeElapsed, setTimeElapsed] = useState(new Date().getTime());
    const [timeLeft, setTimeLeft] = useState(state.timeConstraint);
    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState(0);
    const [answer, setAnswer] = useState(-1);
    const [render, setRender] = useState(false);
    const [retry, setRetry] = useState(false);

    const flush = (renderOrRetry: Function) => {
        setTimeLeft(state.timeConstraint);
        setCorrect(false);
        setError(false);
        setAnswer(0);
        setTimeStart(new Date().getTime());
        renderOrRetry(false);
    }

    useEffect( () => {
        if (state.difficulty !== "custom") {
            generateNumbersBasedOnDifficulty(state.difficulty);
        } else {
            generateNumbersBasedOnRanges(state);
        }
        if (render) flush(setRender);
    }, [render]);


    useEffect( () => {
       flush(setRetry);
    }, [retry]);

    const generateNumbersBasedOnRanges = (state: any) => {
        setFirstNumber(6);
        setSecondNumber(9);
    }

    const generateNumbersBasedOnDifficulty = (difficulty: any) => {
        const easyGame = [Math.floor(Math.random()* 10) + 2, Math.floor(Math.random()* 10) + 2];
        const mediumGame = [Math.floor(Math.random()* 50) + 11, Math.floor(Math.random() * 50) + 11];
        const hardGame = [Math.floor(Math.random()* 100) + 21, Math.floor(Math.random()* 100) + 21];

        if (difficulty == "EASY") {
            setFirstNumber(easyGame[0]);
            setSecondNumber(easyGame[1]);
        } else if (difficulty === "KINDA SUS") {
            setFirstNumber(mediumGame[0]);
            setSecondNumber(mediumGame[1]);
        } else {
            setFirstNumber(hardGame[0]);
            setSecondNumber(hardGame[1]);
        }
    }

    const handleAnswer = (e: React.SyntheticEvent) => {
        const answer = Number((e.currentTarget as HTMLInputElement).value);
        setAnswer(answer);
        setCorrect(answer === (firstNumber*secondNumber));
        setTimeElapsed(((new Date().getTime()) - timeStart) / 1000);
    }

    const sendRunResult = () => {
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               userId: 1,
               firstDigit: firstNumber,
               secondDigit: secondNumber,
               correct: correct,
               timeElapsed: timeElapsed
            })
        };
        try {
            fetch('/play', request)
                .then(response => response.json())
                .then(data => console.log(data))
        } catch (error) {
            console.log(error);
        }
    }


    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        sendRunResult();
        if (correct) {
            setError(false);
            setShowDialog(true);
            ((e.currentTarget) as HTMLFormElement).reset();
            return;
        }
        setError(true);
    }

    const GameField = (props: any) => {
        return (
            <Form className="align-content-xl-center" onSubmit={props.handleSubmit}>
                <Stack gap={2} className="col-md-5 mx-auto">
                    <InputGroup size="lg">
                        <Form.Control autoFocus={true} onChange={props.handleAnswer} placeholder="Answer"></Form.Control>
                    </InputGroup>
                    <Button variant="outline-primary" type="submit">Enter</Button>
                    <Button variant="outline-dark" onClick={() => (navigate('/play'))}>Go back to selection</Button>
                </Stack>
            </Form>
        )
    }

    return (
        <div>
            <Navbar/>
            <br/>
            <h1>{firstNumber} * {secondNumber}</h1>
            <br/>
                <Form className="align-content-xl-center" onSubmit={handleSubmit}>
                    <Stack gap={2} className="col-md-5 mx-auto">
                        <InputGroup size="lg">
                            <Form.Control autoFocus={true} onChange={handleAnswer} placeholder="Answer"/>
                        </InputGroup>
                        <Button variant="outline-primary" type="submit">Enter</Button>
                        <Button variant="outline-dark" onClick={() => (navigate('/play'))}>Go back to selection</Button>
                    </Stack>
                </Form>
            <br/>
            <Clock time={5} stop={showDialog} handleShow={setShowDialog} handleError={setError} handleTimeout={ () => {sendRunResult()} }/>
            <FinishedDialog show={showDialog} handleShow={setShowDialog} handleRender={setRender} handleRetry={setRetry} correct={correct} answer={answer}/>
            <ErrorAnswer error={!error}/>
        </div>
    )
}

export default Game;
