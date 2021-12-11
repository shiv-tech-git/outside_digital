const request = require('supertest')
const app = require('../index');
const { createTestUser, loginAsTestUser, deleteUserByToken, sleep } = require('./test_utils');


it('POST /user/tags', async () => {
	const token = await createTestUser(60);

	let res;
	//POST TAGs
	res = await request(app)
		.post('/tag')
		.set({ "Authorization": `Bearer ${token}` })
		.send({
			name: "user_tag1",
			sortOrder: 0,
		})
	expect(res.status).toEqual(200)

	const tag_1_id = res.body.id;

	res = await request(app)
		.post('/tag')
		.set({ "Authorization": `Bearer ${token}` })
		.send({
			name: "user_tag2",
			sortOrder: 0,
		})
	expect(res.status).toEqual(200)

	const tag_2_id = res.body.id;


	res = await request(app)
		.post('/user/tag')
		.set({ "Authorization": `Bearer ${token}` })
		.send({
			tags: [tag_1_id, tag_2_id]
		})
	expect(res.status).toEqual(200)
	expect(res.body).toHaveProperty('tags')
	expect(res.body.tags).toEqual(
		expect.arrayContaining([
		  expect.objectContaining({id: tag_1_id}),
		  expect.objectContaining({id: tag_2_id})
		])
	  );
	console.log(res.body.tags);

	//DELETE TAG
	res = await request(app)
		.delete(`/tag/${tag_1_id}`)
		.set({ "Authorization": `Bearer ${token}` })
	expect(res.status).toEqual(200)

	res = await request(app)
		.delete(`/tag/${tag_2_id}`)
		.set({ "Authorization": `Bearer ${token}` })
	expect(res.status).toEqual(200)

	await deleteUserByToken(token);
})

