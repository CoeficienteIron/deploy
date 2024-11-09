import collection from "../server.ts";
import { allInfoRecords } from "../utils/calculateMaxRecords.ts";

async function infoForGT(req, res) {
	const user = await collection.findOne({ email: "cem20903@gmail.com" });

	const { totalCI } = allInfoRecords(user, 2024, "ALL");
	const initalWeight = 93;
	const currentWeight = user.normalWeight;
	const weightGoalToLose = 13;

	const currentWeightLoosed = initalWeight - currentWeight;

	const percentajeWeight =
		Math.round(((currentWeightLoosed * 100) / weightGoalToLose) * 100) / 100;

	const roundTotalCI = Math.round(totalCI * 100) / 100;

	res.json({
		percentajeWeight,
		percentajeCI: roundTotalCI > 100 ? 100 : roundTotalCI,
		infoWeight: {
			percentaje: percentajeWeight,
			tableInfo: [{ title: "Peso", current: currentWeight, total: 80 }],
		},
	});
}

async function gtTrainRecords(req, res) {
	const user = await collection.findOne({ email: "cem20903@gmail.com" });
	const allRecords = allInfoRecords(user, 2024, "ALL");
	res.status(200).json(allRecords);
}

export { infoForGT, gtTrainRecords };
