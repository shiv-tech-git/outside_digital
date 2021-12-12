const { Router } = require('express');
const { signin, login, logout } = require("../controller/auth_controllers");
const { checkToken } = require('../middleware/auth_middleware');

const router = Router();





/**
 * @swagger
 * /signin:
 *   post:
 *     tags:
 *      - auth
 *     produces:
 *       - application/json
 *     description: Create new user, return token
 *     responses:
 *       200:
 *         description: Successful operetion
 *         examples:
 *           application/json:
 *             token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5IjoicG9zdG1hbkBnbWFpbC5jb20iLCJpYXQiOjE2MzkyNjcwMDQsImV4cCI6MTYzOTI2ODgwNH0.UUU57Bb1fhu99u71pH2LwyGtrW1Zq8UDK0b5UYNjeew"
 *             expire: "1800"
 *       400:
 *         description: Invalid json
 *         examples:
 *           application/json:
 *             error_message: "Invalid request. You should provide valid json with 'email', 'password' and 'nickname' fields."
 *             error_code: 2
 *     parameters:
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
router.post('/signin', signin);

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *      - auth
 *     produces:
 *       - application/json
 *     description: Login, return token
 *     responses:
 *       200:
 *         description: Successful operetion
 *         examples:
 *           application/json:
 *             token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5IjoicG9zdG1hbkBnbWFpbC5jb20iLCJpYXQiOjE2MzkyNjcwMDQsImV4cCI6MTYzOTI2ODgwNH0.UUU57Bb1fhu99u71pH2LwyGtrW1Zq8UDK0b5UYNjeew"
 *             expire: "1800"
 *       400:
 *         description: Invalid json
 *         examples:
 *           application/json:
 *             error_message: "Invalid login or password."
 *             error_code: 5
 *     parameters:
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
 */
router.post('/login', login);

/**
 * @swagger
 * /logout:
 *   post:
 *     tags:
 *      - auth
 *     produces:
 *       - application/json
 *     description: Logout
 *     responses:
 *       200:
 *         description: Successful operetion
 *         examples:
 *           application/json:
 *             message: "Logged out."
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
router.post('/logout', checkToken, logout);

/**
 * @swagger
 * /ping:
 *   get:
 *     tags:
 *      - ping
 *     produces:
 *       - application/json
 *     description: Login
 *     responses:
 *       200:
 *         description: PONG
 */
 router.get('/ping', (req, res) => {res.send("PONG");})

module.exports = router;