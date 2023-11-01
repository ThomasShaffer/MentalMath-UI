import * as gameSettings from "../../../types/GameTypes";
import React from "react";
import {Button} from "react-bootstrap";

export const RenderDifficulty = (props: any) => {

    const getNextDifficultyLevel = (previousDifficulty: string): gameSettings.GameDifficulty => {
        var previousIndex = 0;
        if (previousDifficulty === "null") return gameSettings.difficultyLevels[0];
        while (gameSettings.difficultyLevels[previousIndex].difficulty !== previousDifficulty) previousIndex++;
        return gameSettings.difficultyLevels[(previousIndex+1) % gameSettings.difficultyLevels.length];
    }

    const handleDifficultyChange = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const previousDifficulty = (e.currentTarget as any).value;
        const nextDifficultyLevel: gameSettings.GameDifficulty = getNextDifficultyLevel(previousDifficulty);
        props.handleChange(nextDifficultyLevel);
    }

    return (
        <Button onClick={handleDifficultyChange} variant={props.gameDifficulty.button} value={props.gameDifficulty.difficulty}>
            {props.gameDifficulty.difficulty === "null" ? "SELECT LEVEL" : props.gameDifficulty.difficulty}
        </Button>
    )
}
