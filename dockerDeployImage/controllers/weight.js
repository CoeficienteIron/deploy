import collection from "../server.ts";

async function trainWeight(req, res) {
	// Por fixear para todos
	const { weight, date } = req.body;
	const email = res.locals.email;
	const user = await collection.findOne({ email });
	user.weight.push({
		weight: parseFloat(weight),
		date: date,
		name: "PESO",
	});

	user.normalWeight = parseFloat(weight);

	await collection.replaceOne({ email }, user);
	res.status(200).json({ isSave: true });
}

async function trainWeights(req, res) {
	const { email } = req.body;
	const user = await collection.findOne({ email });
	res.send({ weight: user.weight });
}

async function getWeights(req, res) {
	const { email } = req.body;
	const user = await collection.findOne({ email });
	res.send({ weight: user.weight });
}

async function weights(req, res) {
	const { email } = req.query;
	const user = await collection.findOne({ email });

	res.send({ weight: user.weight });
}

export { trainWeight, trainWeights, weights, getWeights };
