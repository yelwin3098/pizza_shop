const homeController=require('../app/http/controllers/homeController');
const authController=require('../app/http/controllers/authController');
const cathController=require('../app/http/controllers/customer/cartController');
const orderController=require('../app/http/controllers/customer/ordersController')
const AdminOrderController=require('../app/http/controllers/admin/orderController')

//Middlewares
const guest=require('../app/http/middlewares/guest')
const auth=require('../app/http/middlewares/auth')
const admin=require('../app/http/middlewares/admin')

function initRoutes(app){
    app.get('/',homeController().index);
    
    app.get('/login', guest,authController().login)
    app.post('/login',authController().postLogin)
    app.get('/register',guest,authController().register)
    app.post('/register',authController().postRegister)
    app.post('/logout',authController().logout)

    app.get('/cart',cathController().index)
    app.post('/update-cart',cathController().update)

    //Customer route
    app.post('/orders',auth,orderController().store)
    app.get('/customer/orders',auth,orderController().index)

    //Admin route
    app.get('/admin/orders',admin,AdminOrderController().index)
}

module.exports=initRoutes