const { Router } = require('express');
const { postTag, getTag, getTagList, putTag, deleteTag } = require('../controller/tag_controllers');
const router = Router();

router.post('/', postTag);
router.get('/:id', getTag);
router.get('/', getTagList);
router.put('/:id', putTag)
router.delete('/:id', deleteTag)

module.exports = router;