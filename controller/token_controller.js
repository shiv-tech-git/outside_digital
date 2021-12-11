const jwt_handler = require('../jwt/jwt_handler');
const logger = require('../logger/logger');

module.exports.updateToken = async (req, res) => {
	const user = res.locals.user;
	const old_token = jwt_handler.getBearerToken(req.headers);
	jwt_handler.addToBlacklist(old_token);
	const new_token = jwt_handler.create(user.email);
	logger.log(`User ${res.locals.user.nickname} has update token.`)
	res.status(200).send({ token: new_token });
}