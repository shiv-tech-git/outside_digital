const { Router } = require('express');
const { updateToken } = require('../controller/token_controller');
const router = Router();

router.post('/', updateToken);

module.exports = router;