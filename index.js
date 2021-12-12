require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./router/auth_router');
const userRouter = require('./router/user_router');
const tagRouter = require('./router/tag_router');
const userTagRouter = require('./router/user_tags_router');
const tokenRouter = require('./router/token_router');
const { checkToken } = require('./middleware/auth_middleware');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: "User tag api.",
			description: "Test task for OUTSIDE DIGITAL",
			contact: {
				name: "Shemetov Ilya Vladimirovich"
			},
			servers: [`http://localhost:${process.env.EXPRESS_PORT}`]
		}
	},
	apis: ["index.js", "./router/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/user', checkToken, userRouter);
app.use('/tag', checkToken, tagRouter);
app.use('/user/tag', checkToken, userTagRouter);
app.use('/update_token', checkToken, tokenRouter);
app.use('/', authRouter);

if (process.env.NODE_ENV != "test") {
	app.listen(process.env.EXPRESS_PORT, () => {
	  console.log(`App running on port ${process.env.EXPRESS_PORT}.`)
	})
}

module.exports = app;
