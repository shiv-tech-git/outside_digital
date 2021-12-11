const request = require('supertest')
const app = require('../index')

module.exports.createTestUser = async (number) => {
	let res = await request(app)
		.post('/signin')
		.send({
			email: `test_user${number}@gmail.com`,
			password: `Test_user${number}`,
			nickname: `test_user${number}`
		})
	expect(res.status).toEqual(201)
	return res.body.token;
}

module.exports.loginAsTestUser = async (number) => {
	const res = await request(app)
		.post('/login')
		.send({
			email: `test_user${number}@gmail.com`,
			password: `Test_user${number}`,
		})
	expect(res.status).toEqual(200)
	return res.body.token;
}

module.exports.deleteUserByToken = async (token) => {
	const res = await request(app)
		.delete('/user')
		.set({ "Authorization": `Bearer ${token}` })
	expect(res.status).toEqual(200)
}

module.exports.sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}
