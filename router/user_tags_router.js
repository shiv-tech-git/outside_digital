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
 *                default: [1, 2]
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
 */ 
router.delete('/:id', deleteUserTag);

/**
 * @swagger
 * /user/tag/my:
 *   get:
 *     tags:
 *      - user tag
 *     produces:
 *       - application/json
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
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Bearer token
 *        required: true
 */ 
router.get('/my', myTags);

module.exports = router;
