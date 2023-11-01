type GameMode = "standard" | "custom" | "practice";

type GameDifficulty = {
    difficulty :  "null" | "EASY" | "KINDA SUS" | "HELLA SUS";
    button: "primary" | "success" | "warning" | "danger";
};

type NumberDigits = {
    type: "first" | "second",
    min: number,
    max: number
}

const easyDifficulty: GameDifficulty = {
    difficulty: "EASY",
    button: "success"
};

const mediumDifficulty: GameDifficulty = {
    difficulty: "KINDA SUS",
    button: "warning"
};

const hardDifficulty: GameDifficulty = {
    difficulty: "HELLA SUS",
    button: "danger"
};

export const difficultyLevels: Array<GameDifficulty> = [easyDifficulty, mediumDifficulty, hardDifficulty];
export type {GameMode, GameDifficulty, NumberDigits};
