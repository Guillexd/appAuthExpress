import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { hashPassword } from "../utils.js";
import { userModel } from "../persistencia/models/user.model.js";

//passport-github register
passport.use('githubRegister', new GithubStrategy({
  clientID: 'Iv1.69dce388358d0494',
  clientSecret: 'e200de737a25a9a385b7eb66afcef2199cd60878',
  callbackURL: 'http://localhost:8080/user/github-register',
  passReqToCallback   : true
}, async(accessToken, refreshToken, profile, done) => {
  const user = await userModel.findOne({email: profile._json.email});
  if(!user){
    const newUser = {
      first_name: profile._json.name ? profile._json.name.split(' ')[0] : '-',
      last_name: profile._json.name ? profile._json.name.split(' ')[1] || '-' : '-',
      email: profile._json.email,
      password: ' '
    }
    const newData = await userModel.create(newUser);
    done(null, newData);
  } else {
    done(null, user);
  }
}))

//passport-github login
passport.use('githubLogin', new GithubStrategy({
  clientID: 'Iv1.09282e5c412af075',
  clientSecret: 'ff2109c9226c7c81f3315f48bd384e51d23021ea',
  callbackURL: 'http://localhost:8080/user/github-login'
}, async(accessToken, refreshToken, profile, done) => {
  const user = await userModel.findOne({email: profile._json.email});
  if(user){
    done(null, user);
  } else {
    done();
  }
}))

//passport-google login
passport.use('googleLogin', new GoogleStrategy({
    clientID: "850582077900-1pnhh814tlfksukviimbola4r1c5r996.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8080/user/google-login",
    passReqToCallback: true
  }, 
  async(request, accessToken, refreshToken, profile, done) => {
    const user = await userModel.findOne({email: profile._json.email});
    if(user){
      done(null, user);
    } else {  
      done(null);
    }
  }
));

//passport-google register
passport.use('googleRegister', new GoogleStrategy({
  clientID: "850582077900-acvaq7u8p1sbklgf37vm5sbbirbnshi8.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:8080/user/google-register",
  passReqToCallback: true
}, 
async(request, accessToken, refreshToken, profile, done) => {
  const user = await userModel.findOne({email: profile._json.email});
  if(!user){
    const newUser = {
      first_name: profile._json.name ? profile._json.name.split(' ')[0] : '-',
      last_name: profile._json.name ? profile._json.name.split(' ')[1] || '-' : '-',
      email: profile._json.email,
      password: ' '
    }
    const newData = await userModel.create(newUser);
    done(null, newData);
  } else {
    done(null, user);
  }
}
));

//passport-jwt
passport.use('jwt', new jwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secretKeyJWT'
}, async(jwt_payload, done)=>{
    console.log(jwt_payload);
    done(null, true);
}))

//method
const cookieExtractor = (req) => {
  const token = req?.cookies?.token;
  return token;
}

passport.use('jwtCookies', new jwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: 'secretKeyJWT'
}, async(jwtPayload, done)=>{
    console.log("xd");
    console.log(jwtPayload );
    done(null, true);
}))

//default passport settings
passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async(_id, done) => {
  const user = await userModel.findById(_id);
  done(null, user);
})
