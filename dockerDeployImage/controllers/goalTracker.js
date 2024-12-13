import collection from "../server.ts";
import { allInfoRecords } from "../utils/calculateMaxRecords.ts";

async function infoForGT(_req, res) {

	const user = await collection.findOne({ email: "cem20903@gmail.com" });

	const { totalCI } = allInfoRecords(user, 2024, 'ALL');
	const initalWeight = 86;
	const currentWeight = user?.normalWeight;
	const weightGoalToLose = 6;

	const currentWeightLoosed = initalWeight - currentWeight;

	const percentajeWeight =
		Math.round(((currentWeightLoosed * 100) / weightGoalToLose) * 100) / 100;

	const INITIAL_FAT_PERCENTAGE = 25
	const CURRENT_FAT_PERCENTAGE = 23.4
	const GOAL_FAT_PERCENTAGE = 15

	const CURRENT_FAT_PERCENTAGE_LOOSED = INITIAL_FAT_PERCENTAGE - CURRENT_FAT_PERCENTAGE

	const percentageFat = Math.round(((CURRENT_FAT_PERCENTAGE_LOOSED * 100) / GOAL_FAT_PERCENTAGE) * 100) / 100;


	const totalPercentage = (percentajeWeight + percentageFat) / 2

	const roundTotalCI = Math.round(totalCI * 100) / 100;

	res.json({
		percentajeWeight,
		percentajeCI: roundTotalCI > 100 ? 100 : roundTotalCI,
		infoWeight: {
			percentage: totalPercentage,
			tableInfo: [
				{ title: "Peso", current: currentWeight, total: 80, percentaje: percentajeWeight }, 
				{ title: "Grasa Corporal", current: 23.4, total: 20, percentaje: percentageFat}],
		},
	});
}

async function gtTrainRecords(req, res) {
	const { quarter, year } = req.query
	const user = await collection.findOne({ email: "cem20903@gmail.com" });
	let allRecords
	if(!quarter) {
		allRecords = allInfoRecords(user, 2024, 'ALL');
	} else {
		allRecords = allInfoRecords(user, parseInt(year), quarter);
	}
	 
	res.status(200).json(allRecords);
}

export { infoForGT, gtTrainRecords };
