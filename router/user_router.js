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
 *       400:
 *         description: Invalid token
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
 *       400:
 *         description: Invalid json or token
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Bearer token
 *        required: true
 *      - name: email
 *        in: formData
 *        required: false
 *        type: string
 *      - name: password
 *        in: formData
 *        required: false
 *        type: string
 *      - name: nickname
 *        in: formData
 *        required: false
 *        type: string
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
 *       400:
 *         description: Invalid token
 *     parameters:
 *      - name: Authorization
 *        in: header
 *        description: Bearer token
 *        required: true
 */
router.delete('/', deleteUser);

module.exports = router;
