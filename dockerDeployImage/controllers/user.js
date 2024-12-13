import jwt from "jsonwebtoken";
import collection from "../server.ts";
import { allInfoRecords } from "../utils/calculateMaxRecords.ts";

async function appLogin(req, res) {
	const { email, password } = req.body;

	const user = await collection.findOne({ email });

	if (!user) {
		res.status(401).json({ message: "Usuario No Encontrado" });
		return;
	}

	if (password !== user.password) {
		res.status(401).json({ message: "Contraseña Incorrecta" });
		return;
	}

	const accessToken = jwt.sign({ email }, "secret");
	res.status(201).json({ token: accessToken });
}

async function appSignup(req, res) {
	const { email, genre, weight, password } = req.body;

	const newUser = {
		email,
		genre,
		normalWeight: parseFloat(weight),
		records: [],
		trains: [],
		trainer: "",
		weight: [{ date: new Date(), weight: parseFloat(weight), name: "PESO" }],
		password,
		strengthTraining: [],
		activity: [],
	};

	const user = await collection.find({ email });
	const userLength = await user.count();

	if (userLength === 0) {
		const user = await collection.insertOne(newUser);
		res.status(201).json({});
		return;
	}

	return res.status(401).json({ error: "UserRegistred" });
}

// async function usersLogin(req, res) {
// 	// eslint-disable-next-line no-unused-vars
// 	const { email, password } = req.body;
// 	const user = await collection.find({ email });
// 	const userLength = await user.count();
// 	if (userLength === 0) {
// 		res.status(200).json({});
// 		return;
// 	}
// 	// const token = jwt.sign(
// 	//   // eslint-disable-next-line no-underscore-dangle
// 	//   { userId: usuario._id },
// 	//   'RANDOM_TOKEN_SECRET',
// 	//   { expiresIn: '24h' },
// 	// );

// 	res.status(200).json({
// 		email,
// 		token: "",
// 	});
// }

// async function userRegister(req, res) {
// 	const { email, name, weight, genre } = req.body;

// 	const user = await collection.find({ email });
// 	const numeroUsers = await user.count();
// 	if (numeroUsers > 0) {
// 		res.status(200).json({ error: "UserRegistred" });
// 		return;
// 	}

// 	await collection.insertOne({
// 		email,
// 		name,
// 		trains: [],
// 		records: [],
// 		weight: [],
// 		normalWeight: weight,
// 		genre,
// 	});

// 	// const token = jwt.sign(
// 	//   // eslint-disable-next-line no-underscore-dangle
// 	//   { userId: usuario._id },
// 	//   'RANDOM_TOKEN_SECRET',
// 	//   { expiresIn: '24h' },
// 	// );
// 	res.status(200).json({
// 		email,
// 		token: "",
// 	});
// }

async function usersList(req, res) {
	const allCollections = await collection.find().toArray();

	const users = allCollections.map((user) => {
		// if (user.email !== "cem20903@gmail.com") {
		// 	return {};
		// }
		const infoRecords = allInfoRecords(user, 2024, "ALL");

		const strongRecordsFormated = infoRecords.strongRecords.map((record) => {
			return {
				name: record.exercise,
				value: record.ci,
			};
		});

		const otherRecordsFormated = [
			{ name: "RUNNING", value: infoRecords.aerobicRecords.ci },
			{ name: "POTENCIA", value: infoRecords.powerRecords.ci },
		];

		const recordsCIRounded = [
			...strongRecordsFormated,
			...otherRecordsFormated,
		].map((record) => {
			return {
				...record,
				value: Math.round(record.value * 100) / 100,
			};
		});

		const strongRecordsAbsoluteFormated = infoRecords.strongRecords.map(
			(record) => {
				return {
					name: record.exercise,
					value: record.record,
				};
			}
		);

		const otherRecordsAbsolutedFormated = [
			{ name: "RUNNING", value: infoRecords.aerobicRecords.record },
			{ name: "POTENCIA", value: infoRecords.powerRecords.record },
		];
		console.log(user.name, "NOMBRES");
		return {
			name: user.name,
			weight: user.normalWeight,
			total: Math.round(infoRecords.totalCI * 100) / 100,
			recordsCI: recordsCIRounded,
			recordsAbsolute: [
				...strongRecordsAbsoluteFormated,
				...otherRecordsAbsolutedFormated,
			],
		};
	});

	res.json({ userList: users.filter((users) => users.name) });
}

async function appContact(req, res) {
	const { email, message } = req.body;

	const user = await collection.findOne({ email: "admin@coeficienteiron.com" });
	const newMessage = {
		message,
		from: email,
	};

	user.messages.push(newMessage);

	await collection.replaceOne(
		{ email: "admin@coeficienteiron.com" },
		{ ...user }
	);

	res.json({});
}

export { appLogin, appSignup, usersList, appContact };
