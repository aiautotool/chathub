import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { storage } from './storage';
import { log } from './vite';

// Configure passport with Google strategy
export const configurePassport = () => {
  // Serialize user to session
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  // Check if Google credentials are available
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    // Configure Google Strategy
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: '/auth/google/callback',
          scope: ['profile', 'email']
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            // Create or update user with Google profile
            const user = await storage.createOrUpdateGoogleUser(profile);
            return done(null, user);
          } catch (error) {
            return done(error as Error);
          }
        }
      )
    );
    log('Google OAuth strategy configured', 'auth');
  } else {
    log('Google OAuth credentials not provided. Google login will not be available.', 'auth');
  }

  return passport;
};