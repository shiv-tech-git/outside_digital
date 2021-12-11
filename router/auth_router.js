const { Router } = require('express');
const { signin, login, logout } = require("../controller/auth_controllers");
const { checkToken } = require('../middleware/auth_middleware');

const router = Router();
router.post('/signin', signin);
router.post('/login', login);
router.post('/logout', checkToken, logout);

module.exports = router;