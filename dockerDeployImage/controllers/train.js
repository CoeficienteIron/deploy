import collection from "../server.ts";
import { allInfoRecords } from "../utils/calculateMaxRecords.ts";

async function trainList(req, res) {
	const { user } = req.body;
	const currentUser = await collection.findOne({ email: user });
	res.send({ trains: currentUser?.trains });
}

async function trainSave(req, res) {
	const { user, message, date, etiqueta } = req.body;
	const currentUser = await collection.findOne({ email: user });
	currentUser.trains = [
		...currentUser.trains,
		{ train: message, date, etiqueta },
	];
	const result = await collection.replaceOne({ email: user }, currentUser);
	if (result.matchedCount === 1) {
		res.send({ updateCorrect: true });
	}
}

async function trainRecord(req, res) {
	const { record } = req.body;
	const email = res.locals.email;
	const user = await collection.findOne({ email });
	user.records = user.records ? [...user.records, record] : [record];
	await collection.replaceOne({ email }, user);
	res.status(200).json({});
}

async function trainRecords(req, res) {
	const { year, quarter } = req.body;

	const email = res.locals.email;

	const user = await collection.findOne({ email });

	const allRecords = allInfoRecords(user, year, quarter);

	res.status(200).json(allRecords);
}

async function trainCharts(req, res) {
	const { exercise, type, email } = req.query;
	const { strengthTraining } = await collection.findOne({
		email,
	});

	const numberOfTimesTrained = strengthTraining.filter((train) => {
		return train.training.find(
			(train) =>
				train.name === exercise && train.type === type && train.weight !== 0
		);
	});

	const onlyOne = numberOfTimesTrained.map((train) => {
		const exerciseFiltered = train.training.filter(
			(trainBlock) => trainBlock.name === exercise && trainBlock.type === type
		)[0];

		return {
			date: train.date,
			weight: exerciseFiltered ? exerciseFiltered.weight : 0,
		};
	});

	const sortByDate = onlyOne.sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
	);

	res.send({ exercises: sortByDate });
}

async function trainSteps(req, res) {
	// Por fixear para todos
	const { steps, date } = req.body;
	const email = res.locals.email;
	const user = await collection.findOne({ email });

	const train = {
		date: new Date(),
		training: [
			{
				name: "STEPS",
				type: "STEPS",
				training: [{ exercise: steps, name: "STEPS" }],
			},
		],
	};

	user.strengthTraining.push(train);
	await collection.replaceOne(
		{ email },
		{ ...user, strengthTraining: user.strengthTraining }
	);

	res.status(200).json({ isSave: true });
}

export {
	trainList,
	trainSave,
	trainRecord,
	trainRecords,
	trainCharts,
	trainSteps,
};
