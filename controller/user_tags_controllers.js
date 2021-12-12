const db = require('../database/database');
const logger = require('../logger/logger');
const response_error = require('../response_errors/response_errors');

module.exports.postUserTag = async (req, res) => {
	if (!req.body.tags && Array.isArray(req.body.tags) && req.body.tags.length > 0) {
		logger.errorLog("Invalid post user tag json: ", req.body);
		res.status(400).send(response_error.user_tag_json);
		return;
	}
	const tags_data = {
		tags: req.body.tags,
		uid: res.locals.user.uid
	}
	tryAddTagToUser(res, tags_data);
}

async function tryAddTagToUser(res, tags_data) {
	try {
		const result = await db.insertUserTags(tags_data);
		res.send(result);
	} catch (err) {
		logger.errorLog(err.message);
		res.status(500).send({ error: response_error.unexpectable_error });
	}
}


module.exports.deleteUserTag = async (req, res) => {
	const tag_data = {
		id: req.params.id,
		uid: res.locals.user.uid
	};
	tryDeleteUserTag(res, tag_data);
}

async function tryDeleteUserTag(res, tag_data) {
	try {
		const result = await db.deleteUserTag(tag_data);
		res.send(result);
	} catch (err) {
		logger.errorLog(err.message);
		res.status(500).send({ error: response_error.unexpectable_error });
	}
}

module.exports.myTags = async (req, res) => {
	const uid = res.locals.user.uid;

	try {
		const result = await db.selectUserTags(uid);
		res.send(result);
	} catch (err) {
		logger.errorLog(err.message);
		res.status(500).send({ error: response_error.unexpectable_error });
	}
}
