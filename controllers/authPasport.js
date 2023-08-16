// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const { Usuario } = require('../config/database');


// const GOOGLE_CLIENT_ID = "455768951489-dpmia14fe22vcrimo4fmgbtqnngab2b7.apps.googleusercontent.com";
// const GOOGLE_CLIENT_SECRET = "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" ;

// passport.use(new GoogleStrategy({
//   clientID: GOOGLE_CLIENT_ID,
//   clientSecret: GOOGLE_CLIENT_SECRET,
//   callbackURL: 'http://localhost:3001/auth/google/callback'
// },
// async (accessToken, refreshToken, profile, done) => {
//   try {
//     // Busca el usuario en tu base de datos por el ID de Google
//     let user = await Usuario.findOne({ 
//         where: { 
//             googleId: profile.id 
//         } });

//     if (!user) {
//       // Si el usuario no existe, crea uno nuevo
//       user = await Usuario.create({
//         googleId: profile.id,
//         nombre: profile.displayName,
//         email: profile.emails[0].value // Asegúrate de que Google devuelva el email
//       });
//     }

//     return done(null, user);
//   } catch (error) {
//     return done(error, null);
//   }
// }));

// passport.serializeUser((user, done) => {
//   // Serializa al usuario para almacenarlo en la sesión
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     // Deserializa al usuario desde la sesión
//     const user = await Usuario.findByPk(id);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });

// module.exports = passport;
