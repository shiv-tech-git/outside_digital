const psql = require('./postgres');

const error = psql.error;

const insertUser = (user_data) => {
	return psql.insertUser(user_data);
}

const selectUser = (email) => {
	return psql.selectUser(email);
}

const selectTagsByUid = (uid) => {
	return psql.selectTagsByUid(uid);
}

const selectTagById = (id) => {
	return psql.selectTagById(id);
}

const selectTagList = (id) => {
	return psql.selectTagList(id);
}

const insertTag = (tag_data) => {
	return psql.insertTag(tag_data);
}

const deleteUser = (uid) => {
	return psql.deleteUser(uid);
}

const updateTag = (tag_data) => {
	return psql.updateTag(tag_data);
}

const deleteTag = (tag_data) => {
	return psql.deleteTag(tag_data);
}

const insertUserTags = (tags_data) => {
	return psql.insertUserTags(tags_data);
}

const deleteUserTag = (tag_data) => {
	return psql.deleteUserTag(tag_data);
}

const selectUserTag = (uid) => {
	return psql.selectUserTag(uid);
}


module.exports = {
	insertUser,
	selectUser,
	selectTagsByUid,
	selectTagById,
	selectTagList,
	updateTag,
	insertTag,
	deleteUser,
	deleteTag,
	insertUserTags,
	deleteUserTag,
	selectUserTag,
	error
}