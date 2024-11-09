import { getByYear, calculateSecondsPower, getByQuarter } from "./dates.ts";

import { sortByMax, sortMinToMax } from "./sorters.ts";

import { STRONG_EXERCISES, COEFICIENTS } from "../constants/constants.ts";
import { QUARTERS_TYPES } from "../types/types.ts";

// type Record = { exercise: string, record: number }

function calculateStrongRecords(
	{ records, normalWeight, genre },
	year,
	quarter: QUARTERS_TYPES
) {
	const strongRecords = STRONG_EXERCISES.map((exercise) => {
		const recordsFiltersByExercise = records.filter((record) => {
			const currentExercise = record.exercise === exercise;
			return (
				currentExercise &&
				getByYear(record.date, year) &&
				getByQuarter(record.date, year, quarter)
			);
		});

		const recordByExercise = sortByMax(recordsFiltersByExercise);
		if (!recordByExercise) {
			return {
				exercise,
				record: 0,
			};
		}
		return recordByExercise;
	});

	const recordsWithCI = strongRecords.map((record: any) => {
		const goal =
			record.exercise !== "DOMINADAS"
				? COEFICIENTS[genre][record.exercise] * normalWeight
				: COEFICIENTS[genre][record.exercise];
		const ci = (record.record * 100) / goal;

		return {
			...record,
			ci: ci > 100 ? 100 : ci,
			goal,
		};
	});
	return recordsWithCI;
}

function calculateAerobicRecord({ records, genre }, year, quarter) {
	const currentRecords = [...records];

	const searchAllEndurance = currentRecords.filter(
		(record) =>
			record.exercise === "RUNNING" &&
			getByYear(record.date, year) &&
			getByQuarter(record.date, year, quarter)
	);

	const highestRecord = searchAllEndurance.sort((recordA, recordB) => {
		return recordB.record - recordA.record;
	})[0];

	let CI;

	if (!highestRecord) {
		CI = 0;
	} else {
		CI =
			Math.round(
				((highestRecord.record * 100) / COEFICIENTS[genre].RUNNING) * 100
			) / 100;
	}

	const response = {
		exercise: "RUNNING",
		goal: COEFICIENTS[genre].RUNNING,
		record: highestRecord?.record,
		ci: CI > 100 ? 100 : CI,
	};

	return response;
}

function calculatePowerRecord({ records, genre }, year, quarter) {
	const currentRecords = [...records];

	const searchAllPower = currentRecords.filter(
		(record) =>
			record.exercise === "POTENCIA" &&
			getByYear(record.date, year) &&
			getByQuarter(record.date, year, quarter)
	);

	const recordsInSeconds = searchAllPower.map((record) =>
		calculateSecondsPower(record.record)
	);

	let minRecord: any = 0

	if (typeof sortMinToMax(recordsInSeconds)[0] !== 'undefined') {
		minRecord = sortMinToMax(recordsInSeconds)[0];
	}


	const recordyByGenre = COEFICIENTS[genre].POTENCIA;

	const CIpower = minRecord === 0 ? 0 : (recordyByGenre * 100) / minRecord;

	return {
		exercise: "POTENCIA",
		goal: COEFICIENTS[genre].POTENCIA,
		record: minRecord,
		ci: CIpower,
	};
}

function allInfoRecords(user, year, quarter) {
	const recordsWithRM = calculateStrongRecords(user, year, quarter);
	const aerobicRecordsWithRM = calculateAerobicRecord(user, year, quarter);
	const powerRecordsWithRM = calculatePowerRecord(user, year, quarter);

	const strongCI =
		recordsWithRM.reduce((acc, b) => acc + b.ci, 0) / recordsWithRM.length;

	const totalCI =
		(strongCI + aerobicRecordsWithRM.ci + powerRecordsWithRM.ci) / 3;

	return {
		records: user.records,
		strongRecords: recordsWithRM,
		aerobicRecords: aerobicRecordsWithRM,
		powerRecords: powerRecordsWithRM,
		strongCI,
		totalCI,
	};
}

export { allInfoRecords };
