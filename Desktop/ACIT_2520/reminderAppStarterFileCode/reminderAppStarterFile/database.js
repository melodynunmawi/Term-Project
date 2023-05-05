const database = [
	{
		id: 1, // user id
		email: "cindy123@gmail.com",
		password: "cindy123!",
		reminders: [
			{
				id: 1, // reminder id
				title: "abc",
				description: "abcabc",
				completed: false
			},
			{
				id: 2, // reminder id
				title: "cindy 2nd reminder",
				description: "do something",
				completed: false
			}
		]
	},
	{
		id: 2, // user id
		email: "bob123@gmail.com",
		password: "bob123!",
		reminders: [
			{
				id: 1, // reminder id
				title: "bob's 1st reminder",
				description: "bob 1st description",
				completed: false
			},
			{
				id: 2, // reminder id
				title: "bob's 2nd reminder",
				description: "bob 2nd description",
				completed: false
			}
		]
	},
];

const userModel = {
	findOne: (email) => {
		const user = database.find((user) => user.email === email);
		if (user) {
			return user;
		}
		throw new Error(`Couldn't find user with email: ${email}`);
	},
	findById: (id) => {
		const user = database.find((user) => user.id === id);
		if (user) {
			return user;
		}
		throw new Error(`Couldn't find user with id: ${id}`);
	},
	getLength: () => {
		return database.length;
	},
	create: (user) => {
		database.push(user);
	}
};

module.exports = { database, userModel };