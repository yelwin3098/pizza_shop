require('dotenv').config();
const express=require('express');
const app=express();
const ejs=require('ejs');
const path=require('path');
const expressLayout=require('express-ejs-layouts')
const PORT=process.env.PORT || 3300;
const mongose=require('mongoose');
const session=require('express-session');
const flash=require('express-flash');
const passport=require('passport');
const MongoDbStore=require('connect-mongo')(session);

//Database connection
const url='mongodb://localhost/pizza';
mongose.connect(url,{useNewUrlParser:true,useCreateIndex:true, useUnifiedTopology:true,
useFindAndModify:true});
const connection=mongose.connection;
connection.once('open',()=>{
    console.log('Databse connected...')
}).catch(err=>{
    console.log('Connection failed...')
});

//Session Store 
let mongoStore=new MongoDbStore({
    mongooseConnection:connection,
    collection:'sessions'
})

//Session
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave: false,
    store:mongoStore,
    saveUninitialized: true,
    cookie: { maxAge: 1000*60*60*24 } //24hr
}))

//Passport config
const passportInit=require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

//Asset 
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))
app.use(express.json());

//Global middleawre
app.use((req,res,next)=>{
    res.locals.session=req.session;
    res.locals.user=req.user
    next();
})

//set Template engine
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web')(app);


app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})