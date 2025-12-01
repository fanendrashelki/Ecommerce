import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import passport from 'passport';
import User from '../models/user.model.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const email = profile.emails[0].value;

        // 1️⃣ Find user by email first (because email is unique)
        let user = await User.findOne({ email });

        if (!user) {
          // 2️⃣ If user does not exist → create new Google user
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email,
            avatar: profile.photos[0].value,
            verify_email: true,
          });
        } else if (!user.googleId) {
          // 3️⃣ User exists but not linked with Google → attach googleId
          user.googleId = profile.id;
          user.avatar = profile.photos[0].value; // optional update
          await user.save();
        }

        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);
