const { Router } = require('express');
const { getUser, putUser, deleteUser } = require('../controller/user_controllers');
const router = Router();

/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *      - user
 *     produces:
 *       - application/json
 *     description: Return user data and user tags
 *     responses:
 *       200:
 *         description: Successful operetion
 *         examples:
 *           application/json:
 *             email: test_user@gmail.com
 *             nickname: test_user
 *             tags:
 *              - id: 1
 *                name: tag_1
 *                sortOrder: 0
 *              - id: 2
 *                name: tag_2
 *                sortOrder: 1
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
router.get('/', getUser);

/**
 * @swagger
 * /user:
 *   put:
 *     tags:
 *      - user
 *     produces:
 *       - application/json
 *     description: Alter user data
 *     responses:
 *       200:
 *         description: Successful operetion
 *         examples:
 *           application/json:
 *             email: test_user_new@gmail.com
 *             nickname: test_user_new_nickname
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
 *        schema:
 *          type: object
 *          required:
 *           - email
 *           - password
 *           - nickname
 *          properties:
 *            email: 
 *              type: string
 *              default: test_user@gmail.com
 *            password:
 *              type: string
 *              default: test_userPASSWORD123
 *            nickname:
 *              type: string
 *              default: test_user
 */
router.put('/', putUser);

/**
 * @swagger
 * /user:
 *   delete:
 *     tags:
 *      - user
 *     produces:
 *       - application/json
 *     description: Delete user
 *     responses:
 *       200:
 *         description: Successful operetion
 *         examples:
 *           application/json:
 *             message: User test_user has been deleted.
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
router.delete('/', deleteUser);

module.exports = router;
