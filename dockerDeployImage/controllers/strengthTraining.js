import { differenceInDays } from "../utils/dates.ts";

import { TRAININGS, STRONG_EXERCISES } from "../constants/constants.ts";
import {
	filterBest,
	filterBestTrainTotal,
	filterByLast,
	filterPullUpsMax,
} from "../utils/calculateBestRecords.ts";
import collection from "../server.ts";
import { allInfoRecords } from "../utils/calculateMaxRecords.ts";

async function appRecords(req, res) {
	const { exercise } = req.body;

	const email = res.locals.email;

	const { strengthTraining } = await collection.findOne({ email });

	const lastTrain = filterByLast(strengthTraining, exercise);

	if (exercise === "DOMINADAS") {
		const { maxReps, maxRepsTotal } = filterPullUpsMax(strengthTraining);

		res.json({
			lastTrain,
			maxReps,
			maxRepsTotal,
		});
	} else {
		const bestTrain5x5 = filterBest(
			strengthTraining,
			exercise,
			TRAININGS.FIVE_REPS
		);
		const bestTrain5x3 = filterBest(
			strengthTraining,
			exercise,
			TRAININGS.THREE_REPS
		);

		const bestTrainTotal = filterBestTrainTotal(strengthTraining, exercise);

		res.json({
			lastTrain,
			bestTrain5x5,
			bestTrain5x3,
			bestTrainTotal,
		});
	}
}

async function appTrains(req, res) {
	// const { email, year, quarter } = req.body;

	const email = res.locals.email;

	const user = await collection.findOne({ email });

	const { strongRecords } = allInfoRecords(user, 2024, "ALL");

	const trainings = user.strengthTraining;

	const recordsWithDailyTrain = [...strongRecords].map((record) => {
		const train70percent = (record.record * 70) / 100;
		const train85percent = (record.record * 85) / 100;

		const numberOfTimesTrained = trainings.filter((train) => {
			return train.training.find((train) => train.name === record.exercise);
		}).length;

		return {
			...record,
			numberOfTimesTrained,
			trains: [
				{
					reps: 5,
					weight: train70percent,
					name: TRAININGS.FIVE_REPS,
					exercise: record.exercise,
				},
				{
					reps: 3,
					weight: train85percent,
					name: TRAININGS.THREE_REPS,
					exercise: record.exercise,
				},
			],
		};
	});

	res.status(200).json({ recordsWithDailyTrain });
}

async function appSaveTrains(req, res) {
	const { trains, exerciseName } = req.body;

	const email = res.locals.email;

	const user = await collection.findOne({ email });

	const { strengthTraining } = user;

	if (exerciseName === "DOMINADAS") {
		const buildPullUpTrain = {
			name: "DOMINADAS",
			type: "5",
			training: trains,
		};

		const train = {
			date: new Date(),
			training: [buildPullUpTrain],
		};

		strengthTraining.push(train);
		const email = res.locals.email;
		await collection.replaceOne(
			{ email },
			{ ...user, strengthTraining: strengthTraining }
		);
		res.json({});
		return;
	}

	if (exerciseName === "FREE") {
		const buildFreeTrain = {
			name: "FREE",
			type: "FREE",
			training: trains,
		};

		const train = {
			date: new Date(),
			training: [buildFreeTrain],
		};

		strengthTraining.push(train);
		const email = res.locals.email;
		await collection.replaceOne(
			{ email },
			{ ...user, strengthTraining: strengthTraining }
		);
		res.json({});
		return;
	}

	if (exerciseName === "RUNNING") {
		const buildFreeTrain = {
			name: "RUNNING",
			type: "RUNNING",
			training: trains,
		};

		const train = {
			date: new Date(),
			training: [buildFreeTrain],
		};

		strengthTraining.push(train);
		const email = res.locals.email;
		await collection.replaceOne(
			{ email },
			{ ...user, strengthTraining: strengthTraining }
		);
		res.json({});
		return;
	}

	const buildTrain = trains.map((train) => {
		return {
			name: train.exercise,
			type: train.name,
			weight: train.weight,
		};
	});

	const train = {
		date: new Date(),
		training: buildTrain,
	};

	strengthTraining.push(train);

	await collection.replaceOne(
		{ email },
		{ ...user, strengthTraining: strengthTraining }
	);

	res.json({});
}

async function appListTrains(req, res) {
	const email = res.locals.email;

	const { strengthTraining } = await collection.findOne({ email });

	const lastFivetenDays = [];

	const currentDate = new Date();

	for (let i = 0; i < 15; i++) {
		const date = new Date(currentDate);
		date.setDate(date.getDate() - i);
		date.setHours(0, 0, 0, 0);
		lastFivetenDays.push(date);
	}

	const completedTrains = lastFivetenDays.map((date) => {
		const searchByDate = strengthTraining.filter((train) => {
			const trainDate = new Date(train.date);
			trainDate.setHours(0, 0, 0, 0);
			return trainDate.getTime() === new Date(date).getTime();
		});

		if (searchByDate.length > 0) {
			const dateByExercise = searchByDate[0].date;
			const exercisesNames = searchByDate
				.map((training) => training.training.map((train) => train.name))
				.flat();

			const exercises = [...new Set(exercisesNames)];
			return { date: dateByExercise, exercises };
		}

		return { date, exercises: ["DESCANSO"] };
	});

	res.json({ completedTrains });
}

async function appDashboard(req, res) {
	const email = res.locals.email;
	// const email = "cem20903@gmail.com";

	const { records, strengthTraining } = await collection.findOne({ email });

	const exercisesWithNumberOfDaysLastRecord = STRONG_EXERCISES.map(
		(exerciseName) => {
			const currentExercise = records.filter((record) => {
				// if (exerciseName === "PRESS_MILITAR") {
				// 	console.log("LOLASO");
				// }
				return record.exercise === exerciseName;
			});

			const lastExercise = currentExercise.sort((exerciseA, exerciseB) => {
				return new Date(exerciseB.date) - new Date(exerciseA.date);
			})[0];

			const daysFromLastTry = differenceInDays(
				lastExercise ? lastExercise.date : undefined,
				new Date()
			);

			return {
				name: exerciseName,
				days: daysFromLastTry,
			};
		}
	);

	const lastTrainings = STRONG_EXERCISES.map((exerciseName) => {
		const lastTrain = filterByLast(strengthTraining, exerciseName);

		if (lastTrain) {
			return {
				name: exerciseName,
				days: differenceInDays(lastTrain.date, new Date()),
			};
		}

		return {
			name: exerciseName,
			days: undefined,
		};
	});

	res.json({ lastTrainings, exercisesWithNumberOfDaysLastRecord });
}

async function appRunning(req, res) {
	// TODO: Algo falla, ya veremos el que
	// const email = res.locals.email || ;
	const email = 'cem20903@gmail.com'
	const { strengthTraining } = await collection.findOne({
		email,
	});

	const runningRecords = strengthTraining.filter((training) => {
		return training.training.find((train) => train.name === "RUNNING");
	});

	const runningBuilded = runningRecords.map((training) => {
		return {
			date: training.date,
			training: training.training[0].training[0],
		};
	});

	const recordInKilometres = runningBuilded.sort(
		(trainA, trainB) => trainB.training.exercise - trainA.training.exercise
	)[0];

	res.json({ recordInKilometres });
}

export {
	appRecords,
	appTrains,
	appSaveTrains,
	appListTrains,
	appDashboard,
	appRunning,
};
