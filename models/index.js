const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');
const Post = require('./post');
const Like = require('./like');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};


const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;
db.Post = Post;
db.Like = Like;

User.init(sequelize);
Comment.init(sequelize);
Post.init(sequelize);
Like.init(sequelize);


User.associate(db);
Comment.associate(db)
Post.associate(db)
// Like.associate(db)

module.exports = db;