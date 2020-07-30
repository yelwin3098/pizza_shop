const homeController=require('../app/http/controllers/homeController');
const authController=require('../app/http/controllers/authController');
const cathController=require('../app/http/controllers/customer/cartController');

function initRoutes(app){
    app.get('/',homeController().index);
    
    app.get('/login',authController().login)
    app.get('/register',authController().register)

    app.get('/cart',cathController().index)
    app.post('/update-cart',cathController().update)
}

module.exports=initRoutes