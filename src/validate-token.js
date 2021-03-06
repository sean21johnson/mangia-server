const { validate } = require("uuid");
const { API_TOKEN } = require("./config");
const logger = require("./logger");

function validateToken(req, res, next) {
	const authToken = req.get("Authorization");

	if (!authToken || authToken.split(" ")[1] !== API_TOKEN) {
		logger.error(`Unauthorized request to path: ${req.path}`);
		return res.status(401).json({ error: "Unathorized request" });
	}
	next();
}

module.exports = validateToken;
