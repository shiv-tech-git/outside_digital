const request = require('supertest')
const app = require('../index')
const { createTestUser, loginAsTestUser, deleteUserByToken, sleep } = require('./test_utils');



it('GET /user', async () => {
	const token = await createTestUser(30);

	let res = await request(app)
		.get('/user')
		.set({ "Authorization": `Bearer ${token}` })
	expect(res.status).toEqual(200)
	expect(res.body).toHaveProperty('email')
	expect(res.body).toHaveProperty('nickname')
	expect(res.body).toHaveProperty('tags')

	deleteUserByToken(token);

})

it('PUT /user', async () => {
	let res = await request(app)
		.post('/signin')
		.send({
			email: `test_user31@gmail.com`,
			password: `Test_user31`,
			nickname: `test_user31`
		})
    expect(res.status).toEqual(200)
	const token = res.body.token;

	res = await request(app)
		.put('/user')
		.set({ "Authorization": `Bearer ${token}` })
		.send({
			nickname: "test_user32"
		})
	console.log(res.body)
	expect(res.status).toEqual(200)
	expect(res.body).toHaveProperty('nickname')
	expect(res.body.nickname).toEqual("test_user32")

	await deleteUserByToken(token);

})