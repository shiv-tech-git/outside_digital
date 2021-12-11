const db = require('../database/database');
const jwt_handler = require('../jwt/jwt_handler');
const logger = require('../logger/logger');
const password_handler = require('../password/password_handler');
const response_error = require('../response_errors/response_errors');
const { createNewUserRoutine } = require('../utils/user_utils');


module.exports.login = async (req, res) => {

	//check token
	const user_token = jwt_handler.getBearerToken(req.headers);
	if(user_token && await jwt_handler.check(user_token)) {
		logger.errorLog("Request already has valid token in headers.");
		res.status(200).send({ message: "You are already logged in." });
		return;
	}

	//check json
	let req_user_data = get_user_data(req.body);
	if (!req_user_data) {
		logger.errorLog("Invalid user data:", req.body);
		res.status(400).send(response_error.login_req_json);
		return;
	}

	//check email
	const db_user = await db.selectUser(req_user_data.email);
	if (!db_user) {
		logger.errorLog("No user in database. Request body:", req.body);
		res.status(400).send(response_error.invalid_login_or_password);
		return;
	}

	const passwords_matches = await password_handler.compare(req_user_data.password, db_user.password);
	if (passwords_matches) {
		const token = jwt_handler.create(req_user_data.email);
		logger.log(`User ${db_user.nickname} has logged in.`);
		res.status(200).json({ token, expire: process.env.TOKEN_EXPIRING_TIME_SEC});
		return;
	} else {
		logger.errorLog("Wrong password. Request body:", req.body);
		res.status(400).send(response_error.invalid_login_or_password);
	}
}

function get_user_data(request_body) {
	if (!request_body.email || !request_body.password) {
		return null;
	}
	return {email: request_body.email,
		password: request_body.password,};
}


module.exports.signin = async (req, res) => {
	createNewUserRoutine(req, res, (res) => {
		const user = res.locals.user;
		const token = jwt_handler.create(user.email);
		logger.log(`User ${user.nickname} has been created.`);
		res.status(200).json({ token, expire: process.env.TOKEN_EXPIRING_TIME_SEC});
	});
}


module.exports.logout = async (req, res) => {
	const user_token = jwt_handler.getBearerToken(req.headers);
	if(user_token && await jwt_handler.check(user_token)) {
		await jwt_handler.addToBlacklist(user_token);
		logger.log(`User ${res.locals.user.nickname} has logged out.`);
		res.status(200).send({ message: "Logged out." });
		return;
	} else {
		logger.errorLog("Logging out without valid token.");
		res.status(400).send({ message: "You are not logged in." });
		return;
	}
}