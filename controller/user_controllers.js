const db = require('../database/database');
const { updateUserRoutine } = require('../utils/user_utils');
const logger = require('../logger/logger');
const jwt_handler = require('../jwt/jwt_handler');
const response_error = require('../response_errors/response_errors');

module.exports.getUser = async (req, res) => {
	const user = res.locals.user;
	let tags = await db.selectTagsByUid(user.uid);
	const response = {
		email: user.email,
		nickname: user.nickname,
		tags
	}
	logger.log(`GET user: ${user.email}`);
	res.status(200).send(response);
}

module.exports.putUser = async (req, res) => {
	updateUserRoutine(req, res, (res, result) => {
		res.status(200).send(result);
		logger.log(`PUT user: ${result}`);
	});
}

module.exports.deleteUser = async (req, res) => {
	const user_token = jwt_handler.getBearerToken(req.headers);
	jwt_handler.addToBlacklist(user_token);
	tryToDeleteUser(res);
}

async function tryToDeleteUser(res) {
	try {
		await db.deleteUser(res.locals.user.uid);
		logger.log(`User ${res.locals.user.nickname} has been deleted.`);
		res.status(200).send({message: `User ${res.locals.user.nickname} has been deleted.`});
	} catch (err) {
		logger.errorLog(err.message);
		res.status(500).send({ error: response_error.unexpectable_error });
	}
}