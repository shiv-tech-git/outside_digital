const request = require('supertest')
const app = require('../index')


it('Password check when creating user', async () => {
	//lowercase
	let res = await request(app)
		.post('/signin')
		.send({
			email: "test_user10@gmail.com",
			password: "low_case_only_123",
			nickname: "test_user10"
		})
	expect(res.status).toEqual(400)
	expect(res.body).toHaveProperty('error_code')

	//UPPERCASE
	res = await request(app)
		.post('/signin')
		.send({
			email: "test_user10@gmail.com",
			password: "UPPERCASE10",
			nickname: "test_user10"
		})
	expect(res.status).toEqual(400)
	expect(res.body).toHaveProperty('error_code')

	//without digits
	res = await request(app)
		.post('/signin')
		.send({
			email: "test_user10@gmail.com",
			password: "noDIGITS",
			nickname: "test_user10"
		})
	expect(res.status).toEqual(400)
	expect(res.body).toHaveProperty('error_code')
})