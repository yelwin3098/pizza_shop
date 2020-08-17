const homeController=require('../app/http/controllers/homeController');
const authController=require('../app/http/controllers/authController');
const cathController=require('../app/http/controllers/customer/cartController');
const guest=require('../app/http/middlewares/guest')

function initRoutes(app){
    app.get('/',homeController().index);
    
    app.get('/login', guest,authController().login)
    app.post('/login',authController().postLogin)
    app.get('/register',guest,authController().register)
    app.post('/register',authController().postRegister)
    app.post('/logout',authController().logout)

    app.get('/cart',cathController().index)
    app.post('/update-cart',cathController().update)
}

module.exports=initRoutes