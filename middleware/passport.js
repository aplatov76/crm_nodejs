const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const auth = require('../models/auth');

const User = mongoose.model('users');

const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'dev-jwt',
    expiresIn: '240h'
    // issuer: 'accounts.examplesoft.com',
    // audience: 'yoursite.net'
}
module.exports = passport => {
    passport.use(new JwtStrategy(options, async (payload, done) => {
        try{
            //console.log('payloadUserId: ', payload.userId);
            //const user = await User.findById(payload.userId).select('email id');
            const user = auth.findUser(payload.userId)

            //console.log(`user: ${user}`)
            if(user)
                 done(null, user)
             else 
                 done(null, false)
            
        } catch(err) {
            console.log(err)
        }

        // User.findOne({id: jwt_payload.sub}, function(err, user) {
        //     if (err) {
        //         return done(err, false);
        //     }
        //     if (user) {
        //         return done(null, user);
        //     } else {
        //         return done(null, false);
        //         // or you could create a new account
        //     }
        // });
    }));
}


