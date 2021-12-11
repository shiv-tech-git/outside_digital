const bcrypt = require('bcrypt');
const passwordValidator = require('password-validator');

let schema = new passwordValidator();
schema
.is().min(8)
.has().uppercase()
.has().lowercase()
.has().digits()

const get_hash = async (password) => {
	const salt = await bcrypt.genSalt();
  	return await bcrypt.hash(password, salt);
}

const compare = async (request_pass, db_pass) => {
	const the_same = await bcrypt.compare(request_pass, db_pass);
    if (the_same) {
      	return true;
    }
	return false;
}

const validate = (password) => {
	return schema.validate(password);
}



module.exports = {
	get_hash,
	validate,
	compare
}