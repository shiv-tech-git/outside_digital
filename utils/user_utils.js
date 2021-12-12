const db = require('../database/database');
const logger = require('../logger/logger')
const password_handler = require('../password/password_handler');
const response_error = require('../response_errors/response_errors');
const email_validator = require('email-validator');

module.exports.createNewUserRoutine = async (req, res, onsuccess) => {
	let user_data = checkUserData(req, res);
	if (!user_data)
		return;

	user_data.password = await password_handler.get_hash(user_data.password);
	tryToCreateNewUser(user_data, res, onsuccess);
}

function checkUserData(req, res) {
	//check json
	const user_data = getUserData(req.body);
	if (!user_data) {
		logger.errorLog("Invalid request", req.body);
		res.status(400).send(response_error.singin_req_json);
		return null;
	}

	//check email
	if (!email_validator.validate(user_data.email)) {
		logger.errorLog("Invalid email", req.body);
		res.status(400).send({ error: response_error.invalid_email});
		return null;
	}

	//check password
	if (!password_handler.validate(user_data.password)) {
		logger.errorLog("Invalid password", user_data.password);
		res.status(400).send(response_error.password_schema_validation);
		return null;
	}
	res.locals.user = user_data;
	return user_data;
}

async function tryToCreateNewUser(user_data, res, onsuccess){
	try {
		await createNewUser(user_data, res, onsuccess);
	}
	catch(err) {
		handleDBUserError(err, res);
	}
}

async function createNewUser(user_data, res, onsuccess) {
	await db.insertUser(user_data);
	onsuccess(res);
	return;
}

function handleDBUserError(err, res) {
	logger.errorLog(err);
	if (db.errorAnalyzer.isEmailCollision(err)) {
		res.status(400).send(response_error.email_collision);
	} else if (db.errorAnalyzer.isNicknameCollision(err)) {
		res.status(400).send(response_error.nickname_collision);
	} else {
		res.status(500).send(response_error.unexpectable_error);
	}
}

function getUserData(request_body) {
	if (!request_body.email || !request_body.password || !request_body.nickname) {
		return null;
	}
	return {email: request_body.email,
		password: request_body.password,
		nickname: request_body.nickname};
}

module.exports.updateUserRoutine = async (req, res, onsuccess) => {
	let user_data = {};
	user_data.uid = res.locals.user.uid;
	//check email
	const email = req.body.email;
	if (email) {
		if (email_validator.validate(email)) {
			user_data.email = email;
		} else {
			logger.errorLog("Invalid email", req.body);
			res.status(400).send({ error: response_error.invalid_email});
			return;
		}
	}

	//check password
	const password = req.body.password;
	if (password) {
		if (password_handler.validate(password)) {
			user_data.password = await password_handler.get_hash(password);;
		} else {
			logger.errorLog("Invalid password", user_data.password);
			res.status(400).send(response_error.password_schema_validation);
			return;
		}
	}
	
	if (req.body.nickname) {
		user_data.nickname = req.body.nickname;
	}

	tryToUpdateUser(user_data, res, onsuccess);
}


async function tryToUpdateUser(user_data, res, onsuccess){
	try {
		const result = await db.updateUser(user_data);
		onsuccess(res, result)
	}
	catch(err) {
		handleDBUserError(err, res)
	}
}


