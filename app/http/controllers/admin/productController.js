const Menu=require('../../../models/menu')

function productController(){
    return{
         index:(req,res)=>{
                    res.render('admin/create_product')
        },
        create:async (req,res,next)=>{
            const files = req.file
            if (!files) {
                const error = new Error('Please choose files')
                return next(error)
            }
            const menu = new Menu({
                name: req.body.name,
                price: req.body.price,
                image: 'uploads/'+req.file.filename,
                size: req.body.size
            });
            const saveMenu = await menu.save();
            if (!saveMenu) return res.status(400).json('Menu create Fail');
            res.redirect('/admin/product_create')
        }
    }
}

module.exports=productController;