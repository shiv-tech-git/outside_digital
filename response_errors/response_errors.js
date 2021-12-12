module.exports = {
	login_req_json: {
		error_message: "Invalid request. You should provide valid json with 'email' and 'password' fields.",
		error_code: 1
	},
	singin_req_json: {
		error_message: "Invalid request. You should provide valid json with 'email', 'password' and 'nickname' fields.",
		error_code: 2
	},
	password_schema_validation: {
		error_message:  "Password must be minimum length 8, must have at least one uppercase, one lowercase letter and one digit.",
		error_code: 3
	},
	invalid_email: {
		error_message:  "Invalid email.",
		error_code: 4
	},
	invalid_login_or_password: {
		error_message:  "Invalid login or password.",
		error_code: 5
	},
	invalid_token: {
		error_message:  "Invalid token.",
		error_code: 6
	},
	unexpectable_error: {
		error_message:  "Something went wrong...",
		error_code: 7
	},
	email_or_login_collision: {
		error_message:  "User with email or nickname already exists.",
		error_code: 8
	},
	post_tag_json: {
		error_message:  "Invalid request. You should provide valid json with 'name' and 'sortOrder' fields.",
		error_code: 9
	},
	put_tag_json: {
		error_message:  "Invalid request. You should provide valid json with 'name' or 'sortOrder' fields.",
		error_code: 10
	},
	invalid_tag_id: {
		error_message:  "Invalid tag id.",
		error_code: 11
	},
	invalid_tag_id_or_creator: {
		error_message:  "Tag with given id belongs to another user or don't exist.",
		error_code: 12
	},
	tag_name_exists: {
		error_message:  "Tag with given name already exists.",
		error_code: 13
	},
	user_tag_json: {
		error_message:  "Invalid request. You should provide valid json with 'tags' field.",
		error_code: 14
	},
	email_collision: {
		error_message:  "User with given email already exists.",
		error_code: 15
	},
	nickname_collision: {
		error_message:  "User with given nickname already exists.",
		error_code: 16
	}
}