const request = require('supertest');
const app = require('./app');
const db = require('./models');

let token;

describe('test', () => {
	beforeAll(async () => {
		await db.sequelize.sync({ force: true })
			.then((res) => {
				console.log('database connected')
			}).catch(err => {
				console.log('err', err)
		})
	});
	afterAll( async () => {
		await db.sequelize.close()
	})
	describe('', () => {

		it('signup', async () => {
			const payload = {
				id: 'test',
				password: '1331'
			}
			const res = await request(app).post('/signup').send(payload);
			expect(res.status).toBe(201)
		});
		it('login', async () => {
			const payload = {
				id: 'test',
				password: '1331'
			}
			const res = await request(app).post('/login').send(payload)
			token = res.body
			expect(res.status).toBe(200)
		})
		// it('test', async () => {
		// 	const res = await request(app).get('/test').set('Authorization', `Bearer ${token}`)
		// 	console.log(res.status)
		// 	// expect(res.status).toBe(200)
		// })
	})
})