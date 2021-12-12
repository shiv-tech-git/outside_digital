const jwt = require('jsonwebtoken');
const db = require('../database/database');
const { createBlackList } = require('jwt-blacklist');
const logger = require('../logger/logger');

let blacklist;

async function initBlacklist() {
	blacklist = await createBlackList({
		daySize: 10000,
		errorRate: 0.001,
	});
}
initBlacklist();

const addToBlacklist = async (token) => {
	await blacklist.add(token);
}

const isInBlacklist = async (token) => {
	return await blacklist.has(token);
}

const create = (body) => {
	const expiring_after = parseInt(process.env.TOKEN_EXPIRING_TIME_SEC);
	return jwt.sign({ body }, process.env.TOKEN_SECRET, {expiresIn: expiring_after});
};

const check = async (token) => {
	const is_in_black_list = await isInBlacklist(token)
	if (is_in_black_list) {
		return false;
	}

	try {
		let decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		const email = decoded.body;
		const time_left = Math.floor((decoded.exp - Math.floor(Date.now() / 1000)) / 60);
		logger.log(`Token expires in ${time_left} min.`);
		const db_user = await db.selectUser(email);
		if (!db_user) {
			return false;
		}
		return true;
	} catch(err) {
		logger.errorLog("token error: ", err.message);
		return false;
	}
}

const getUserByToken = async (token) => {
	if (!token)
		return null;

	if (await isInBlacklist(token))
		return null;

	try {
		let decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		const email = decoded.body;
		const db_user = await db.selectUser(email);
		if (!db_user) {
			return null;
		}
		return db_user;
	} catch(err) {
		return null;
	}
}

function getBearerToken(headers) {
	const authHeader = headers['authorization'];
	return authHeader && authHeader.split(' ')[1];
}

module.exports = {
	create,
	check,
	addToBlacklist,
	isInBlacklist,
	getBearerToken,
	getUserByToken
}
