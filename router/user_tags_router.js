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
 *         examples:
 *           application/json:
 *             tags:
 *              - id: 0
 *                name: tag_0
 *                sortOrder: 0
 *              - id: 1
 *                name: tag_1
 *                sortOrder: 0
 *              - id: 2
 *                name: tag_2
 *                sortOrder: 0
 *       400:
 *         description: Invalid json or token
 *         examples:
 *           application/json:
 *             message: "This route demands valid token."
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Bearer token
 *        required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - tags
 *             properties:
 *               tags:
 *                 type: array
 *                 items:
 *                   type: integer
 *             example:
 *               tags: [1, 2]
 *     security:
 *       - bearerAuth: []
 */ 
router.post('/', postUserTag);

/**
 * @swagger
 * /user/tag/{id}:
 *   delete:
 *     tags:
 *      - user tag
 *     produces:
 *       - application/json
 *     description: Delete tag from user
 *     responses:
 *       200:
 *         description: Successful operetion
 *         examples:
 *           application/json:
 *             tags:
 *              - id: 0
 *                name: tag_0
 *                sortOrder: 0
 *              - id: 1
 *                name: tag_1
 *                sortOrder: 0
 *       400:
 *         description: Invalid token
 *         examples:
 *           application/json:
 *             message: "This route demands valid token."
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Bearer token
 *        required: true
 *      - name: id
 *        in: path
 *        description: Tag id
 *        required: true
 *        type: integer
 *     security:
 *       - bearerAuth: []
 */ 
router.delete('/:id', deleteUserTag);

/**
 * @swagger
 * /user/tag/my:
 *   get:
 *     tags:
 *      - user tag
 *     description: Return tags that been created by user
 *     responses:
 *       200:
 *         description: Successful operetion
 *         examples:
 *           application/json:
 *             tags:
 *              - id: 0
 *                name: tag_0
 *                sortOrder: 0
 *              - id: 1
 *                name: tag_1
 *                sortOrder: 0
 *       400:
 *         description: Invalid token
 *         examples:
 *           application/json:
 *             message: "This route demands valid token."
 *     security:
 *       - bearerAuth: []
 */ 
router.get('/my', myTags);

module.exports = router;
