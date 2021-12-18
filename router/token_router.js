const { Router } = require('express');
const { updateToken } = require('../controller/token_controller');
const router = Router();

/**
 * @swagger
 * /update_token:
 *   get:
 *     tags:
 *      - token
 *     produces:
 *       - application/json
 *     description: Get new token
 *     responses:
 *       200:
 *         description: Successful operetion
 *       400:
 *         description: Invalid token
 *     security:
 *       - bearerAuth: []
 */
router.get('/', updateToken);

module.exports = router;