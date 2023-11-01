import {Button, ButtonGroup, Form, InputGroup, Spinner, Stack} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import Navbar from "../shared/nav-bar/navbar.component";
import {useEffect, useState} from "react";
import {clearInterval} from "timers";
import {Clock} from "../shared/Clock";

const Game = (props: any) => {
    const navigate = useNavigate();
    const state = useLocation().state;

    const [error, setError] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [timeStart] = useState(new Date().getTime());
    const [timeElapsed, setTimeElapsed] = useState(new Date().getTime());
    const [timeLeft, setTimeLeft] = useState(state.timeConstraint);
    const [firstNumber, setFirstNumber] = useState(0);
    const [secondNumber, setSecondNumber] = useState(0);
    const [answer, setAnswer] = useState(-1);

    useEffect(() => {
        if (state.difficulty !== "custom") {
            generateNumbersBasedOnDifficulty(state.difficulty);
        } else {
            generateNumbersBasedOnRanges(state);
        }
    },[]);


    const generateNumbersBasedOnRanges = (state: any) => {
        setFirstNumber(6);
        setSecondNumber(9);
    }

    const generateNumbersBasedOnDifficulty = (difficulty: any) => {
        const easyGame = [Math.floor(Math.random()* 10) + 1, Math.floor(Math.random()* 10) + 1];
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

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        !correct ? setError(true) : setError(false);

    }

    const ShowError = () => {
        let message: string = "";
        if (error) message = "IMBECILE";
        return (
            <h1>{message}</h1>
        );
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
                            <Form.Control autoFocus={true} onChange={handleAnswer} placeholder="Answer"></Form.Control>
                        </InputGroup>
                        <Button variant="outline-primary" type="submit">Enter</Button>
                        <Button variant="outline-dark" onClick={() => (navigate('/play'))}>Go back to selection</Button>
                    </Stack>
                </Form>
            <br/>
            <Clock time={state.timeConstraint} stop={correct}/>
            <ShowError />
        </div>
    )
}

export default Game;
