const request = require('supertest')
const app = require('../index')
const { createTestUser, loginAsTestUser, deleteUserByToken, sleep } = require('./test_utils');




it('POST GET DELETE /tag', async () => {
	const token = await createTestUser(50)
	let res;

	//POST TAG
	res = await request(app)
		.post('/tag')
		.set({ "Authorization": `Bearer ${token}` })
		.send({
			name: "test_tag",
			sortOrder: 0,
		})
	expect(res.status).toEqual(200)
	expect(res.body).toHaveProperty('id')
	expect(res.body).toHaveProperty('name')
	expect(res.body).toHaveProperty('sortOrder')

	const tag_id = res.body.id;

	//GET TAG
	res = await request(app)
		.get(`/tag/${tag_id}`)
		.set({ "Authorization": `Bearer ${token}` })
	expect(res.status).toEqual(200)
	expect(res.body).toHaveProperty('creator')
	expect(res.body).toHaveProperty('name')
	expect(res.body).toHaveProperty('sortOrder')

	//PUT TAG
	res = await request(app)
		.put(`/tag/${tag_id}`)
		.set({ "Authorization": `Bearer ${token}` })
		.send({
			name: "test_tag_alter",
		})
	expect(res.status).toEqual(200)
	expect(res.body).toHaveProperty('name')
	expect(res.body.name).toMatch("test_tag_alter")


	//DELETE TAG
	res = await request(app)
		.delete(`/tag/${tag_id}`)
		.set({ "Authorization": `Bearer ${token}` })
	expect(res.status).toEqual(200)

	await deleteUserByToken(token);

})
