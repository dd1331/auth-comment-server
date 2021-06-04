const request = require('supertest');
const app = require('./app');

describe('test', () => {
	it('test', async () => {
		expect(true).toBe(true)
		const res = await request(app).get('/test').send({
			test:'test1331'
		})
		expect(res.status).toBe(200)
	})

})