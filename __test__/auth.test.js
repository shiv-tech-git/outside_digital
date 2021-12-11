const request = require('supertest')
const app = require('../index')

const { createTestUser, loginAsTestUser, deleteUserByToken, sleep } = require('./test_utils');


it('Should create and delete user', async () => {
	//create user
	const res = await request(app)
		.post('/signin')
		.send({
			email: "test_user1@gmail.com",
			password: "Test_user1",
			nickname: "test_user1"
		})
	expect(res.body).toHaveProperty('token')
	expect(res.body).toHaveProperty('expire')
	const token = res.body.token;
	
	//delete user
	const res1 = await request(app)
		.delete('/user')
		.set({ "Authorization": `Bearer ${token}` })
	expect(res1.status).toEqual(200)
	expect(res1.body).toHaveProperty('message')
})



it('Should not create a new user with same email or password', async () => {
	//create user
	let res = await request(app)
		.post('/signin')
		.send({
			email: "test_user2@gmail.com",
			password: "Test_user2",
			nickname: "test_user2"
		})
	const token = res.body.token;
		
	//check same email
	res = await request(app)
	.post('/signin')
	.send({
		email: "test_user2@gmail.com",
		password: "Test_user2",
		nickname: "test_user42"
	})
	expect(res.status).toEqual(400);
	expect(res.body).toHaveProperty('error_code')
	expect(res.body).toHaveProperty('error_message')

	//check same nickname
	res = await request(app)
	.post('/signin')
	.send({
		email: "test_user42@gmail.com",
		password: "Test_user2",
		nickname: "test_user2"
	})
	expect(res.status).toEqual(400);
	expect(res.body).toHaveProperty('error_code')
	expect(res.body).toHaveProperty('error_message')

	//delete user
	await deleteUserByToken(token)
})


it('Logging in, logging out.', async () => {
	let token = await createTestUser(3);
	
	//logging out
	let res = await request(app)
		.post('/logout')
		.set({ "Authorization": `Bearer ${token}` })
	expect(res.status).toEqual(200);

	res = await request(app)
		.delete('/user')
		.set({ "Authorization": `Bearer ${token}` })
	expect(res.status).toEqual(400)

	await sleep(1000);

	const token2 = await loginAsTestUser(3);

	//successfully delete user
	await deleteUserByToken(token2)
})
