const { Router } = require('express');
const { getUser, putUser, deleteUser } = require('../controller/user_controllers');
const router = Router();

router.get('/', getUser);
router.put('/', putUser);
router.delete('/', deleteUser);

module.exports = router;
