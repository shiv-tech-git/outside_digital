const { Router } = require('express');
const { postTag, getTag, getTagList, putTag, deleteTag } = require('../controller/tag_controllers');
const router = Router();



/**
 * @swagger
 * /tag:
 *   post:
 *     tags:
 *      - tag
 *     produces:
 *       - application/json
 *     description: Create new tag
 *     responses:
 *       200:
 *         description: Successful operetion
 *         examples:
 *           application/json:
 *                id: 1
 *                name: "new_tag"
 *                sortOrder: "0"
 *       400:
 *         description: Invalid json or token
 *         examples:
 *           application/json:
 *                error_message: "Invalid request. You should provide valid json with 'name' and 'sortOrder' fields."
 *                error_code: 9
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Bearer token
 *        required: true
 *      - in: body
 *        schema:
 *          type: object
 *          required:
 *           - name
 *           - sortOrder
 *          properties:
 *            name: 
 *              type: string
 *              default: new_tag
 *            sortOrder:
 *              type: string
 *              default: "0"
 */
router.post('/', postTag);

/**
 * @swagger
 * /tag/{id}:
 *   get:
 *     tags:
 *      - tag
 *     produces:
 *       - application/json
 *     description: Get tag by id
 *     responses:
 *       200:
 *         description: Successful operetion
 *         examples:
 *           application/json:
 *                creator:
 *                  nickname: test_user
 *                  uid: 1
 *                name: "new_tag"
 *                sortOrder: "0"
 *       400:
 *         description: Invalid token
 *         examples:
 *           application/json:
 *                error_message: "Invalid tag id."
 *                error_code: 11
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
 *        format: int64
 */
router.get('/:id', getTag);

/**
 * @swagger
 * /tag:
 *   get:
 *     tags:
 *      - tag
 *     produces:
 *       - application/json
 *     description: Get tag list
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
 *      - name: sortByOrder
 *        in: query
 *        description: Sort list by order
 *      - name: sortByName
 *        in: query
 *        description: Sort list by name
 *      - name: offset
 *        in: query
 *        description: Offset
 *      - name: length
 *        in: query
 *        description: Length
 */
router.get('/', getTagList);

/**
 * @swagger
 * /tag/{id}:
 *   put:
 *     tags:
 *      - tag
 *     produces:
 *       - application/json
 *     description: Alter tag
 *     responses:
 *       200:
 *         description: Successful operetion
 *         examples:
 *           application/json:
 *                id: 1
 *                name: "new_tag_alter"
 *                sortOrder: "2"
 *       400:
 *         description: Invalid json or token
 *         examples:
 *           application/json:
 *                error_message: Tag with given id belongs to another user or doesn't exist."
 *                error_code: 12
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
 *        format: int64
 *      - in: body
 *        schema:
 *          type: object
 *          properties:
 *            name: 
 *              type: string
 *              default: new_tag_alter
 *            sortOrder:
 *              type: string
 *              default: "2"
 */
router.put('/:id', putTag)

/**
 * @swagger
 * /tag/{id}:
 *   delete:
 *     tags:
 *      - tag
 *     produces:
 *       - application/json
 *     description: Delete tag
 *     responses:
 *       200:
 *         description: Successful operetion
 *         examples:
 *           application/json:
 *             message: Tag has been deleted.
 *       400:
 *         description: Invalid json or token
 *         examples:
 *           application/json:
 *             error_message: Tag with given id belongs to another user or doesn't exist."
 *             error_code: 12
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
 *        format: int64
 */
router.delete('/:id', deleteTag)

module.exports = router;