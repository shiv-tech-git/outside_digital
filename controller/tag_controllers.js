const db = require('../database/database');
const logger = require('../logger/logger');
const response_error = require('../response_errors/response_errors');


module.exports.postTag = async (req, res) => {
	let tag_data =  getTagData(req.body);
	if (!tag_data) {
		logger.errorLog("Invalid tag data: ", req.body);
		res.status(400).send(response_error.post_tag_json);
		return null;
	}
	tag_data.creator = res.locals.user.uid;
	tryToCreateTag(res, tag_data);
}

async function tryToCreateTag(res, tag_data) {
	try {	
		const result = await db.insertTag(tag_data);
		const response = {
			id: result.id,
			name: tag_data.name,
			sortOrder: tag_data.sortOrder
		};
		res.status(200).send(response);
	} catch(err) {
		handleCreatingNewTagError(res, err);
	}
}

function handleCreatingNewTagError() {
	logger.errorLog(err.message);
	
	switch(parseInt(err.code)) {
		case db.error.email_already_exists:
			res.status(400).send({ error: response_error.tag_name_exists });
			break;
		default:
			res.status(500).send({ error: response_error.unexpectable_error });
	}
}

function getTagData(request_body) {
	if (!request_body.name) {
		return null;
	}
	if (!request_body.sortOrder) {
		request_body.sortOrder = 0;
	}
	return {
		name: request_body.name,
		sortOrder: request_body.sortOrder
	};
}

module.exports.getTag = async (req, res) => {
	const tag_id = req.params.id;
	try {
		const result = await db.selectTagById(tag_id);
		if (!result) {
			logger.log("Invalid tag id:", tag_id)
			res.status(400).send(response_error.invalid_tag_id);
			return;
		}
		logger.log("GET tag:", result)
		res.send(result);
	} catch (err) {
		logger.errorLog(err.message)
		res.status(500).send(response_error.unexpectable_error);
	}
}

module.exports.getTagList = async (req, res) => {
	try {
		const result = await db.selectTagList(req.query);
		console.log(result);
		res.status(200).send(result);
	} catch (error) {
		logger.errorLog(err.message)
		res.status(500).send(response_error.unexpectable_error);
	}
}

module.exports.putTag = async (req, res) => {
	const tag_data = getNewTagData(req.body);
	if (!tag_data) {
		logger.errorLog("Invalid request:", req.body); 
		res.status(400).send(response_error.put_tag_json);
		return;
	}
	tag_data.id = req.params.id;
	tag_data.uid = res.locals.user.uid;
	tryUpdateTag(res, tag_data);
}

async function tryUpdateTag(res, tag_data) {
	try {
		const result = await db.updateTag(tag_data);
		if (!result) {
			logger.errorLog("Tag id belongs to another user or don't exist.");
			res.status(400).send(response_error.invalid_tag_id_or_creator);
			return;
		}
		res.status(200).send(formatUpdatedTagData(result, res.locals.user));
	} catch (err) {
		logger.errorLog(err.message);
		res.status(500).send(response_error.unexpectable_error);
	}
}

function formatUpdatedTagData(query_result, user_data) {
	return {
		creator: {
			nickname: user_data.nickname,
			uid: user_data.uid
		},
		name: query_result.name,
		sortOrder: query_result.sortorder
	};
}

function getNewTagData(req_body) {
	let tag_data = {};
	if (!req_body.name && !req_body.sortOrder) {
		return null;
	}
	if (req_body.name) {
		tag_data.name = req_body.name;
	}
	if (req_body.sortOrder) {
		tag_data.sortOrder = req_body.sortOrder;
	}
	return tag_data;
}

module.exports.deleteTag = async (req, res) => {
	tag_data = {
		id: req.params.id,
		uid: res.locals.user.uid
	};
	tryDeleteTag(res, tag_data);
}

async function tryDeleteTag(res, tag_data) {
	try {
		db.deleteTag(tag_data);
		res.status(200).send();
	} catch (err) {
		logger.errorLog(err.message);
		res.status(500).send(response_error.unexpectable_error);
	}
}

