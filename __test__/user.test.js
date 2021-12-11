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
	const token = await createTestUser(31);

	let res = await request(app)
		.put('/user')
		.set({ "Authorization": `Bearer ${token}` })
		.send({
			email: "put_user@gmail.com",
			password: "PUT_user_42",
			nickname: "put_user"
		})
	expect(res.status).toEqual(200)
	expect(res.body).toHaveProperty('email')
	expect(res.body).toHaveProperty('nickname')

	deleteUserByToken(token);

	res = await request(app)
		.post('/login')
		.send({
			email: "put_user@gmail.com",
			password: "PUT_user_42",
		})
	const token2 = res.body.token;
	await deleteUserByToken(token2);

})