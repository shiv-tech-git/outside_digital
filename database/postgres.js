const { Client } = require('pg')
const logger = require('../logger/logger')

const error = {
	email_already_exists: 23505
} 

const client = new Client({
	user: process.env.PSQL_USER,
	host: process.env.PSQL_HOST,
	database: process.env.PSQL_DATABASE,
	password: process.env.PSQL_PASSWORD,
	port: process.env.PSQL_PORT,
})

async function dbConnect() {
	let retries = 10;
	while (retries) {
		try {
			await client.connect();
			break;
		} catch (error) {
			retries -= 1;
			logger.errorLog(`Retries left ${retries}`);
			await new Promise(res => setTimeout(res, 5000));
		}
	}
}

dbConnect();


const insertUser = (user_data) => {
	const {email, password, nickname} = user_data;
	return client.query(`INSERT INTO users (email, password, nickname) VALUES ('${email}', '${password}', '${nickname}')`);
}

const selectUser = async (email) => {
	const query = `SELECT * FROM users WHERE email='${email}'`;
	const result = await client.query(query);
	return result.rows[0];
}

const selectTagsByUid = async (uid) => {
	const query = `SELECT tags.id, tags.name, tags.sortorder FROM user_tag LEFT JOIN tags ON tags.id=user_tag.tag_id WHERE user_tag.user_id='${uid}'`;
	const result = await client.query(query);
	return result.rows.map( tag => { return {id: tag.id, name: tag.name, sortOrder: tag.sortorder}});
}

const selectTagList = async (params) => {
	let query = "SELECT count(*) OVER() AS quantity, t.name, t.sortorder, t.id, u.nickname, u.uid FROM tags t LEFT JOIN users u ON t.creator=u.uid ";
	let meta = {};

	if (params.hasOwnProperty("sortByOrder")) {
		query += "ORDER BY t.sortorder ";
	} else if (params.hasOwnProperty("sortByName")) {
		query += "ORDER BY t.name ";
	}

	if (params.length) {
		query += `LIMIT ${params.length} `;
		meta.length = params.length;
	}
	if (params.offset) 
	{
		query += `OFFSET ${params.offset} `;
		meta.offset = params.offset;
	}
	const result = await client.query(query);

	let tmp = {};
	tmp.data = result.rows.map(tag => format_tag(tag));
	if (result.rows.length > 0) {
		meta.quantity = result.rows[0].quantity;
	}
	tmp.meta = meta;
	return tmp;
}

const selectTagById = async (id) => {
	let result = await client.query(`SELECT t.name, t.sortorder, u.nickname, u.uid FROM tags t LEFT JOIN users u ON t.creator=u.uid WHERE t.id='${id}'`);
	if (result.rows.length == 0)
		return null;

	result = result.rows[0];
	return format_tag(result);
}

const insertTag = async (tag_data) => {
	const { creator, name, sortOrder} = tag_data;
	const result = await client.query(`INSERT INTO tags (creator, name, sortorder) VALUES('${creator}', '${name}', '${sortOrder}') RETURNING id`);
	return result.rows[0];
}

const deleteUser = (uid) => {
	return client.query(`DELETE FROM users WHERE uid='${uid}'`);
}

const updateTag = async (tag_data) => {
	let query = `UPDATE tags `;
	if (tag_data.name && tag_data.sortOrder) {
		query += `SET name='${tag_data.name}', sortorder='${tag_data.sortOrder}' `;
	} else if (tag_data.name) {
		query += `SET name='${tag_data.name}' `;
	} else if (tag_data.sortOrder) {
		query += `SET sortorder='${tag_data.sortOrder}' `;
	}
	query += `WHERE id='${tag_data.id}' AND creator='${tag_data.uid}' RETURNING name, sortorder`;
	
	const result = await client.query(query);
	return result.rows[0];
}

const deleteTag = async (tag_data) => {
	const query = `DELETE FROM tags WHERE id='${tag_data.id}' AND creator='${tag_data.uid}' RETURNING *`;
	const result =  await client.query(query);
	return result.rows.length > 0;
}

const insertUserTags = async (tags_data) => {
	let query = '';
	query += `BEGIN; `;
	tags_data.tags.forEach(item => {
		query += `INSERT INTO user_tag (user_id, tag_id) SELECT '${tags_data.uid}', '${item}' WHERE NOT EXISTS (SELECT user_tag.user_id, user_tag.tag_id FROM user_tag WHERE user_tag.user_id='${tags_data.uid}' AND user_tag.tag_id='${item}'); `
	});
	query += "COMMIT;";
	query += `SELECT tags.id, tags.name, tags.sortorder FROM user_tag left join tags on tags.id=user_tag.tag_id where user_tag.user_id='${tags_data.uid}';`
	try {
		const result = await client.query(query);
		const tags = result[tags_data.tags.length+2].rows;
		return formatUserTags(tags);
	} catch (err) {
		client.query("ROLLBACK;");
		throw err;
	}
}

const deleteUserTag = async (tag_data) => {
	let query = `DELETE FROM user_tag WHERE user_id='${tag_data.uid}' AND tag_id='${tag_data.id}'; `;
	query += `SELECT tags.id, tags.name, tags.sortorder FROM user_tag left join tags on tags.id=user_tag.tag_id where user_tag.user_id='${tag_data.uid}';`
	const result = await client.query(query);
	const tags = result[1].rows;
	return formatUserTags(tags);
}

const selectUserTags = async (uid) => {
	const query = `SELECT id, name, sortorder FROM tags WHERE creator='${uid}';`
	const result = await client.query(query);
	const tags = result.rows;
	return formatUserTags(tags);
}

const updateUser = async (user_data) => {
	let query_counter = 0;
	let query = "";
	query += 'BEGIN; ';
	if (user_data.email) {
		query += `UPDATE users SET email='${user_data.email}' WHERE uid=${user_data.uid}; `;
		query_counter++;
	}
	if (user_data.nickname) {
		query += `UPDATE users SET nickname='${user_data.nickname}' WHERE uid=${user_data.uid}; `;
		query_counter++;
	}
	if (user_data.password) {
		query += `UPDATE users SET password='${user_data.password}' WHERE uid=${user_data.uid}; `;
		query_counter++;
	}
	query += 'COMMIT; ';
	query += `SELECT email, nickname from users WHERE uid=${user_data.uid}; `;
	try {
		const result = await client.query(query);
		return result[query_counter + 2].rows[0];
	} catch (err) {
		client.query("ROLLBACK;");
		throw err;
	}
}


function formatUserTags(tags) {
	const formatted_tags = tags.map(tag => {
		return {
			id: tag.id,
			name: tag.name,
			sortOrder: tag.sortorder
		};
	})
	return {
		tags: formatted_tags
	};
}

function format_tag(tag) {
	return {
		creator: {
			nickname: tag.nickname,
			uid: tag.uid
		},
		id: tag.id,
		name: tag.name,
		sortOrder: tag.sortorder
	}
}

function isEmailCollision(err) {
	return err.message && err.message.includes("users_email_key")
}

function isNicknameCollision(err) {
	return err.message && err.message.includes("users_nickname_key")
}

const errorAnalyzer = {
	isEmailCollision,
	isNicknameCollision
}

module.exports = {
	insertUser,
	selectUser,
	selectTagsByUid,
	selectTagById,
	selectTagList,
	insertTag,
	deleteUser,
	updateTag,
	deleteTag,
	insertUserTags,
	deleteUserTag,
	selectUserTags,
	updateUser,
	errorAnalyzer,
	error
}

