import collection from "../server.ts";

async function activityUsers(req, res) {
	const allCollections = await collection.find().toArray();

	const lastFivetenDays = [];

	const currentDate = new Date();

	for (let i = 0; i < 15; i++) {
		const date = new Date(currentDate);
		date.setDate(date.getDate() - i);
		date.setHours(0, 0, 0, 0);
		lastFivetenDays.push(date);
	}

	const currentUsers = allCollections.map((user) => {
		return {
			email: user.email,
			activity: user.activity,
		};
	});

	const matchDaysAndUsers = lastFivetenDays.map((currentDate) => {
		let arrayUsers = [];

		currentUsers.forEach((user) => {
			const hasActivity = !!user.activity?.find((activityObject) => {
				activityObject.date.setHours(0, 0, 0, 0);
				return (
					new Date(activityObject.date).getTime() ===
					new Date(currentDate).getTime()
				);
			});
			arrayUsers.push({ email: user.email, hasActivity });
		});

		return {
			date: currentDate,
			userActivity: arrayUsers,
		};
	});

	res.json({
		activity: matchDaysAndUsers,
		users: currentUsers.map((users) => users.email),
	});
}

async function messages(req, res) {
	const { messages } = await collection.findOne({
		email: "admin@coeficienteiron.com",
	});

	res.json({ messages });
}

export { activityUsers, messages };
