const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');

module.exports = () => {
	passport.use(new LocalStrategy({
					usernameField: 'id',
					passwordField: 'password'
			},
			function (id, password, done) {
					return User.findOne({where: { user_id: id, password}})
							.then(user => {
									if (!user) {
											return done(null, false, {message: 'Incorrect email or password.'});
									}
									return done(null, user, {message: 'Logged In Successfully'});
							})
							.catch(err => done(err));
			}
	));
	
	passport.use(new JWTStrategy({
					jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
					// secretOrKey   : process.env.JWT_SECRET
					secretOrKey   : 'randomString'
			},
			function (jwtPayload, done) {
					return User.findOne({ where: { id: jwtPayload.id }})
							.then(user => {
									return done(null, user);
							})
							.catch(err => {
									return done(err);
							});
			}
	));
}