const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/user');

module.exports = () => {
	passport.use(new LocalStrategy({
			usernameField: 'id',
			passwordField: 'password'
		},
		async (id, password, done) => {
			const user = await User.findOne({
				where: { user_id: id }
			});
			if (!user) return done(null, false, { message: 'Incorrect email or password.' });
			const isEqual = await bcrypt.compare(password, user.password)
			if (!isEqual) return done(null, false, { message: 'Incorrect email or password.' });

			return done(null, user, { message: 'Logged In Successfully' });
		}
	));
	
	passport.use(new JWTStrategy({
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
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