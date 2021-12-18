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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - name
 *              - sortOrder
 *             properties:
 *               name: 
 *                 type: string
 *               sortOrder:
 *                 type: string
 *             example:
 *               name: new_tag
 *               sortOrder: "0"
 *     security:
 *       - bearerAuth: []
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
 *      - name: id
 *        in: path
 *        description: Tag id
 *        required: true
 *        type: integer
 *        format: int64
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
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
 *      - name: id
 *        in: path
 *        description: Tag id
 *        required: true
 *        type: integer
 *        format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *                 default: new_tag_alter
 *               sortOrder:
 *                 type: string
 *                 default: "2"
 *     security:
 *       - bearerAuth: []
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
 *        in: path
 *        description: Tag id
 *        required: true
 *        type: integer
 *        format: int64
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', deleteTag)

module.exports = router;