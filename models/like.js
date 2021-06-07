const Sequelize = require('sequelize');

module.exports = class Like extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			isLike: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: true,
				defaultValue: Sequelize.NOW
			}
		}, {
			sequelize,
			timestamps: false,
			modelName: 'Like',
			tableName: 'likes',
			paranoid: false,
			charset: 'utf8mb4',
			collate: 'utf8mb4_general_ci'
		});
	}

	static associate(db) {
		db.Like.belongsTo(db.User, { foreignKey: 'liker', targetKey: 'id' });
		db.Like.belongsTo(db.Comment, { foreignKey: 'commentId', targetKey: 'id' });
		// db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
		// db.Comment.belongsTo(db.Post, { foreignKey: 'postId', targetKey: 'id' });
	}
}