require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const auth_router = require('./router/auth_router');
const user_router = require('./router/user_router');
const tag_router = require('./router/tag_router');
const user_tag_router = require('./router/user_tags_router');
const token_router = require('./router/token_router');
const { checkToken } = require('./middleware/auth_middleware');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user', checkToken, user_router);
app.use('/tag', checkToken, tag_router);
app.use('/user/tag', checkToken, user_tag_router);
app.use('/', auth_router);
app.use('/update_token', checkToken, token_router);

app.post('/test', (req, res) => {
	res.send({test: "test"});
})

if (process.env.NODE_ENV != "test") {
	app.listen(process.env.EXPRESS_PORT, () => {
	  console.log(`App running on port ${process.env.EXPRESS_PORT}.`)
	})
}

module.exports = app;
