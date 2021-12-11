if (process.env.PROD == 1) {
	module.exports = require('./prod_loger');
} else {
	module.exports = require('./dev_logger');
}