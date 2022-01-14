const homeController=require('../app/http/controllers/homeController');
const authController=require('../app/http/controllers/authController');
const cathController=require('../app/http/controllers/customer/cartController');
const orderController=require('../app/http/controllers/customer/ordersController')
const AdminOrderController=require('../app/http/controllers/admin/orderController')
const AdminProductController=require('../app/http/controllers/admin/productController')
const statusController=require('../app/http/controllers/admin/statusController')

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
});
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});
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
    app.get('/customer/orders/:id', auth, orderController().show);

    //Admin route
    app.get('/admin/orders',admin,AdminOrderController().index)
    app.get('/admin/product_create',admin,AdminProductController().index)
    app.post('/admin/product_create',upload.single('image'), admin,AdminProductController().create)

    app.post('/admin/order/status',admin,statusController().update)
    
}

module.exports=initRoutes