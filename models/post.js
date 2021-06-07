const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			title: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			content: {
				type: Sequelize.STRING(1000),
				allowNull: false,
			}
		}, {
			sequelize,
			timestamps: false,
			modelName: 'Post',
			tableName: 'posts',
			paranoid: false,
			charset: 'utf8mb4',
			collate: 'utf8mb4_general_ci'
		});
	}

	static associate(db) {
		db.Post.belongsTo(db.User, { foreignKey: 'poster', targetKey: 'id' });
		db.Post.hasMany(db.Comment, { foreignKey: 'postId', sourceKey: 'id'});
		db.User.hasMany(db.Post, { foreignKey: 'poster', sourceKey: 'id'});

	}
}