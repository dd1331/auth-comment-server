const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			comment: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			likeCount: {
				type: Sequelize.INTEGER,
				defaultValue: 0
			},
			dislikeCount: {
				type: Sequelize.INTEGER,
				defaultValue: 0
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: true,
				defaultValue: Sequelize.NOW,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: true,
			}
		}, {
			sequelize,
			timestamps: false,
			modelName: 'Comment',
			tableName: 'comments',
			paranoid: false,
			charset: 'utf8mb4',
			collate: 'utf8mb4_general_ci'
		});
	}

	static associate(db) {
		db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
		db.Comment.belongsTo(db.Post, { foreignKey: 'postId', targetKey: 'id' });
		db.Comment.hasMany(db.Like, { foreignKey: 'commentId', targetKey: 'id'})
	}
}