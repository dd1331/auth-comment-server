const request = require('supertest');
const app = require('./app');
const db = require('./models');

let token;
let createdPost;
let createdComment;

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
		it('post', async () => {
			const payload = {
				title: 'test ttitle',
				content: 'test content'
			}
			await request(app).post('/post').set('Authorization', `Bearer ${token}`).send(payload)
			await request(app).post('/post').set('Authorization', `Bearer ${token}`).send(payload)
			const { body, status } = await request(app).post('/post').set('Authorization', `Bearer ${token}`).send(payload)
			createdPost = body
			expect(status).toBe(201)
		})
		it('comment', async () => {
			const payload = { comment: 'testcomment', postId: createdPost.id }
			await request(app).post('/comment').set('Authorization', `Bearer ${token}`).send(payload)
			const { body, status } = await request(app).post('/comment').set('Authorization', `Bearer ${token}`).send(payload)
			createdComment = body
			expect(status).toBe(201)
		})
		it('comment filter', async () => {
			const payload = { comment: 'banned word', postId: createdPost.id }
			const { body, status } = await request(app).post('/comment').set('Authorization', `Bearer ${token}`).send(payload)
			expect(status).toBe(304)
		})
		it('update comment', async () => {
			const payload = { commentId: createdComment.id, comment: 'updatedComment' }
			const { body, status } = await request(app).patch('/comment').set('Authorization', `Bearer ${token}`).send(payload)
			expect(status).toBe(204)
		})
		it('like comment', async () => {
			const payload = {
				commentId: createdComment.id,
				isLike: false
			}
			const { body, status } = await request(app).post(`/like`).set('Authorization', `Bearer ${token}`)
				.send(payload);
			expect(status).toBe(201);
		})
		it('delete comment', async () => {
			const commentId = createdComment.id
			const { body, status } = await request(app).delete(`/comment/${commentId}`).set('Authorization', `Bearer ${token}`)
			expect(status).toBe(204)
		})
		
	})
})