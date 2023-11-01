import {Button, Form, InputGroup} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import Navbar from "../shared/nav-bar/navbar.component";
import {useState} from "react";

const Game = (props: any) => {
    const navigate = useNavigate();
    const state = useLocation().state;

    const easyGame = [Math.floor(Math.random()* 10) + 1, Math.floor(Math.random()* 10) + 1];
    const mediumGame = [Math.floor(Math.random()* 50) + 11, Math.floor(Math.random() * 50) + 11];
    const hardGame = [Math.floor(Math.random()* 100) + 21, Math.floor(Math.random()* 100) + 21];

    const [answer, setAnswer] = useState(0);

    const displayGameBasedOnDifficulty = (difficulty: string) => {
        console.log(difficulty);
        let firstNumber: number;
        let secondNumber: number;
        if (difficulty === "EASY") {
            firstNumber = easyGame[0];
            secondNumber = easyGame[1];
        } else if (difficulty === "KINDA SUS") {
            firstNumber = mediumGame[0];
            secondNumber = mediumGame[1];
        } else {
            firstNumber = hardGame[0];
            secondNumber = hardGame[1];
        }
        return (
            <div>
                <h1>   {firstNumber} </h1>
                <h1> x {secondNumber} </h1>
            </div>
        )
    }

    const handleAnswer = (e: React.SyntheticEvent) => {
        const answer = Number((e.currentTarget as HTMLInputElement).value);
        setAnswer(answer);
        console.log(answer);
    }

    const handleSubmit = (e: React.SyntheticEvent) => {

    }

    return (
        <div>
            <Navbar/>
            {displayGameBasedOnDifficulty(state.difficulty)}
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <InputGroup.Text>Answer</InputGroup.Text>
                    <Form.Control onChange={handleAnswer} placeholder="put answer"></Form.Control>
                </InputGroup>
            </Form>
            <br/>
            <Button onClick={() => (navigate('/play'))}>Go back to selection</Button>
        </div>
    )
}

export default Game;
