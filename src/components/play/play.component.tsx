import * as gameSettings from "../../types/GameTypes";
import React, {useState} from "react";
import Navbar from "../shared/nav-bar/navbar.component";
import {useNavigate} from "react-router-dom";
import {Accordion, Button, Modal} from "react-bootstrap";
import {CustomPlayMenu} from "./playitems/CustomPlayMenu";
import {StandardPlayMenu} from "./playitems/StandardPlayMenu";
import {ErrorInput} from "../shared/error/ErrorInput";

const Play = (props: any) => {

    const navigate = useNavigate();

    const [showError, setShowError] = useState(false);
    const [gameMode, setGameMode] = useState<gameSettings.GameMode>("standard");
    const [gameDifficulty, setGameDifficulty] = useState<gameSettings.GameDifficulty>({difficulty:"null", button:"primary"});
    const [firstNumberDigits, setFirstNumberDigits] = useState<gameSettings.NumberDigits>({type: "first", min: 0, max: 0});
    const [secondNumberDigits, setSecondNumberDigits] = useState<gameSettings.NumberDigits>({type: "second", min: 0, max: 0});
    const [maxTime, setMaxTime] = useState(0);


    const flushState = () => {
        setGameDifficulty({difficulty: "null", button:"primary"});
        setFirstNumberDigits({type: "first", min: 0, max: 0});
        setSecondNumberDigits({type: "second", min: 0, max: 0});
        setMaxTime(0);
    }

    const handleStandardSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        navigate('/game', {
                state: {
                    difficulty: gameDifficulty.difficulty,
                    timeConstraint: 30
                }
        });
    }

    const handleCustomSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        navigate('/game', {
            state: {
                    firstDigitMin: firstNumberDigits.min,
                    firstDigitMax: firstNumberDigits.max,
                    secondDigitMin: secondNumberDigits.min,
                    secondDigitMax: secondNumberDigits.max,
                    timeConstraint: 30
            }
        });

    }

    const renderSelectionMenu = () => {
        return (
            <Accordion defaultActiveKey={gameMode} onSelect={flushState}>
                <StandardPlayMenu gameDifficulty={gameDifficulty} handleGameDifficulty={setGameDifficulty} handleGameMode={setGameMode}
                                  flushState={flushState} onSubmit={handleStandardSubmit}/>
                <CustomPlayMenu firstNumberDigits={firstNumberDigits} handleFirstNumberDigits={setFirstNumberDigits}
                                secondNumberDigits={secondNumberDigits} handleSecondNumberDigits={setSecondNumberDigits}
                                maxTime={maxTime} handleMaxTime={setMaxTime}
                                showError={showError} handleShowError={setShowError}
                                flushState={flushState} onSubmit={handleCustomSubmit}/>
            </Accordion>
        )
    }
    return (
        <div>
            <Navbar/>
            {renderSelectionMenu()}
            <ErrorInput showError={showError} handleCloseError={() => setShowError(false)}/>
        </div>
    )
}

export default Play;
