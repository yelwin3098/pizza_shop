const Order=require('../../../models/orders');

function orderController(){
    return{
        async index(req,res){
            Order.find({status:{$ne:'completed'}},null,{sort:{'createdAt':-1}}).
            populate('customerId','-password').exec((err,orders)=>{
                if(req.xhr){
                    return res.json(orders)
                }else{
                    res.render('admin/orders')
                }
            })
        }
    }
}

module.exports=orderController;