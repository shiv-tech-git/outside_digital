const { Router } = require('express');
const { postUserTag, deleteUserTag, myTags } = require('../controller/user_tags_controllers');
const router = Router();

router.post('/', postUserTag);
router.delete('/:id', deleteUserTag);
router.get('/my', myTags);

module.exports = router;
