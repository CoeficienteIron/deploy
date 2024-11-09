import { TRAININGS } from "../constants/constants.ts";
import { EXERCISES, STRENGTH_TRAIN_TYPE, Train } from "../types/types.ts";


function filterBest(strengthTraining: Train[], exercise: string, type: STRENGTH_TRAIN_TYPE) {
	const exercisesFiltered = strengthTraining.map((train) => train.training);

	const mergeExercises = exercisesFiltered
		.flat(1)
		.filter((eachTrain) => eachTrain.name === exercise)
		.filter((eachTrain) => eachTrain.type === type);

	const sortedBy = mergeExercises.sort(
		(trainB, trainA) => trainA.weight - trainB.weight
	)[0];

	return sortedBy;
}

function filterBestTrainTotal(strengthTraining, exercise: EXERCISES) {
	const onlyFilterByExercise = strengthTraining.map((trainWithDate) => ({
		...trainWithDate,
		training: trainWithDate.training.filter((train) => train.name === exercise),
	}));

	const removeEmpty = onlyFilterByExercise.filter(
		(eachTrain) => eachTrain.training.length !== 0
	);

	const calculateBest = removeEmpty.map((eachTrain) => {
		const train5x5 = eachTrain.training.find(
			(train) => train.type === TRAININGS.FIVE_REPS
		);
		const train5x3 = eachTrain.training.find(
			(train) => train.type === TRAININGS.THREE_REPS
		);
		const calculate5x5 = train5x5 ? train5x5.weight * 5 : 0;
		const calculate5x3 = train5x3 ? train5x3.weight * 3 : 0;

		return {
			...eachTrain,
			total: calculate5x5 + calculate5x3,
		};
	});

	const sortedBy = calculateBest.sort(
		(trainB, trainA) => trainA.total - trainB.total
	)[0];

	return sortedBy;
}

function filterByLast(strengthTraining, exercise) {
	const onlyFilterByExercise = strengthTraining.map((trainWithDate) => {
		return {
			...trainWithDate,
			training: trainWithDate.training.filter((train) => {
				return train.name === exercise;
			}),
		};
	});

	const removeEmpty = onlyFilterByExercise.filter(
		(eachTrain) => eachTrain.training.length !== 0
	);

	const exercisesSorted = removeEmpty.sort((a, b) => {
		const dateA = new Date(a.date).getTime();
		const dateB = new Date(b.date).getTime();

		if (dateA > dateB) return -1;
		if (dateA < dateB) return 1;
		return 0;
	});

	exercisesSorted.forEach((exercise, index) => {
		if (
			new Date(exercise.date).getTime() ===
			new Date("2024-07-10T20:35:45.413+00:00").getTime()
		) {
		}
	});

	return exercisesSorted[0];
}

function filterPullUpsMax(strengthTraining) {
	const exercisesFiltered = strengthTraining.map((train) => train.training);

	const mergeExercises = exercisesFiltered
		.flat(1)
		.filter((eachTrain) => eachTrain.name === "DOMINADAS");

	const exercisesTransformed = mergeExercises.map((train) => {
		return {
			...train,
			trainingMax: Math.max(...train.training),
			trainingTotal: train.training.reduce((acc, reps) => acc + reps, 0),
		};
	});

	let maxReps = exercisesTransformed.sort(
		(trainB, trainA) => trainA.trainingMax - trainB.trainingMax
	)[0];
	maxReps = maxReps ? maxReps.trainingMax : 0;

	let maxRepsTotal = exercisesTransformed.sort(
		(trainB, trainA) => trainA.trainingTotal - trainB.trainingTotal
	)[0];
	maxRepsTotal = maxRepsTotal ? maxRepsTotal.trainingTotal : 0;

	return { maxReps, maxRepsTotal };
}

export { filterByLast, filterBestTrainTotal, filterBest, filterPullUpsMax };
