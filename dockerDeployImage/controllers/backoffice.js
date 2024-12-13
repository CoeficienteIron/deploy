import collection from "../server.ts";

async function messages(req, res) {
	const { messages } = await collection.findOne({
		email: "admin@coeficienteiron.com",
	});

	res.json({ messages });
	return;
}

export { messages };
