const express = require("express");
const uuid = require("uuid");
const path = require("path");
const UsersService = require("./users-service");

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter.post("/", jsonBodyParser, (req, res, next) => {
	const { password, username, first_name, last_name, email } = req.body;

	for (const field of [
		"first_name",
		"last_name",
		"username",
		"email",
		"password",
	])
		if (!req.body[field])
			return res.status(400).json({
				error: `Missing '${field}' in request body`,
			});
	const passwordError = UsersService.validatePassword(password);

	if (passwordError) return res.status(400).json({ error: passwordError });

	UsersService.hasUserWithUserName(req.app.get("db"), username)
		.then((hasUserWithUserName) => {
			if (hasUserWithUserName)
				return res.status(400).json({ error: `Username already taken` });

			return UsersService.hashPassword(password).then((hashedPassword) => {
				const newUser = {
					users_id: uuid.v4(),
					first_name,
					last_name,
					email,
					username: username.toLowerCase(),
					pass_word: hashedPassword,
					date_created: new Date(),
				};
				return UsersService.insertUser(req.app.get("db"), newUser).then(
					(user) => {
						res
							.status(201)
							.location(path.posix.join(req.originalUrl, `/${user.id}`))
							.json(UsersService.serializeUser(user));
					}
				);
			});
		})
		.catch(next);
});

module.exports = usersRouter;
