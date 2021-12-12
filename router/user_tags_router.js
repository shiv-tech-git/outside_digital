const { Router } = require('express');
const { postUserTag, deleteUserTag, myTags } = require('../controller/user_tags_controllers');
const router = Router();

/**
 * @swagger
 * /user/tag:
 *   post:
 *     tags:
 *      - user tag
 *     produces:
 *       - application/json
 *     description: Add tag to user
 *     responses:
 *       200:
 *         description: Successful operetion
 *       400:
 *         description: Invalid json or token
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Bearer token
 *        required: true
 *      - in: body
 *        description: The user to create.
 *        schema:
 *          type: object
 *          required:
 *           - tags
 *          properties:
 *            tags:
 *              type: array
 *              items:
 *                type: integer
 *              default: [1, 2]
 */ 
router.post('/', postUserTag);
router.delete('/:id', deleteUserTag);
router.get('/my', myTags);

module.exports = router;
