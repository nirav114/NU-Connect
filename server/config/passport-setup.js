const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const dotenv = require('dotenv')

dotenv.config({path : './config.env'});
const PORT = process.env.BACKEND_PORT;
const CLIENTID = process.env.CLIENTID;
const CLIENTSECRET = process.env.CLIENTSECRET;

passport.serializeUser((user , done) => {
	done(null , user);
})
passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(new GoogleStrategy({
	    clientID:CLIENTID, // Your Credentials here.
	    clientSecret:CLIENTSECRET, // Your Credentials here.
	    callbackURL:`http://localhost:${PORT}/auth/callback`,
	    passReqToCallback:true
    },
    function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));