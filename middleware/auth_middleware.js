const jwt_handler = require('../jwt/jwt_handler');
const logger = require('../logger/logger');


module.exports.checkToken = async (req, res, next) => {
	const user_token = jwt_handler.getBearerToken(req.headers);
	if(user_token && await jwt_handler.check(user_token)) {
		logger.log("Auth check: success.");
		const user = await jwt_handler.getUserByToken(user_token);
		res.locals.user = user;
		next();
	} else {
		res.status(400).send({ message: "This route demands valid token." });
	}
}

