import { CI_BY_GENRE, CI_GENRE, Quarters } from "../types/types.ts";

const STRONG_EXERCISES = [
	"PRESS_BANCA",
	"PRESS_MILITAR",
	"DOMINADAS",
	"SENTADILLA",
	"PESO_MUERTO",
];

const MALE: CI_BY_GENRE = {
	PRESS_MILITAR: 0.75,
	PRESS_BANCA: 1,
	PESO_MUERTO: 1.8,
	SENTADILLA: 1.5,
	DOMINADAS: 8,
	RUNNING: 5,
	POTENCIA: 15,
}

const FEMALE: CI_BY_GENRE =
{
	PRESS_MILITAR: 0.35,
	PRESS_BANCA: 0.5,
	PESO_MUERTO: 1.2,
	SENTADILLA: 0.9,
	DOMINADAS: 2,
	RUNNING: 5,
	POTENCIA: 18,
}


const COEFICIENTS: CI_GENRE = {
	MALE,
	FEMALE,
};

const QUARTERS: Quarters = {
	FIRST: [0, 1, 2],
	SECOND: [2, 3, 4],
	THIRD: [5, 6, 7],
	FOUR: [8, 9, 10],
	ALL: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
};

const TRAININGS = {
	FIVE_REPS: "5X5",
	THREE_REPS: "5X3",
};

export { STRONG_EXERCISES, COEFICIENTS, QUARTERS, TRAININGS };
