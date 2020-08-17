const LoaclStrategy=require('passport-local').Strategy
const User=require('../models/user')
const bcrypt=require('bcrypt')

function init(passport){
    passport.use(new LoaclStrategy({usernameField:'email'},async(email,password,done)=>{
        //Login
        //Chech if email exists
        const user=await User.findOne({email:email})
        if(!user){
            return done(null,false,{message:"No user with this email"})
        }
        bcrypt.compare(password, user.password).then(match=>{
            if(match){
                return done(null,user,{message:"Logged in succesfully"})
            }
            return done(null,false,{message:"Wrong username or password"})
        }).catch(err=>{
            return done(null,false,{message:"Something went wrong"})
        })
    }))
    passport.serializeUser((user, done) =>{
        done(null, user._id); 
       // where is this user.id going? Are we supposed to access this anywhere?
    });
    
    // used to deserialize the user
    passport.deserializeUser((id, done)=> {
        User.findById(id, (err, user)=> {
            done(err, user);
        });
    });
}

module.exports=init