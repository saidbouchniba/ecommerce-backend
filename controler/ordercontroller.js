const orders = require("../model/orderSchema")
exports.createorder = async (req, res) => {
    const user = req.user
    try {
        if (user.cart.length!=0) {
        const total = user.cart.reduce((acc, el) => acc + el.product.price * el.quantity, 0)
        const order = new orders({
            cart: user.cart,
            total: total,
            user:user
        })
        await order.save()
        user.cart = []
        await user.save()
        res.status(200).send({
            Msg: "order will be processed ",
            order
        })}
        else{
            res.status(400).send({
                Msg:"you didnt select any product"
            })
        }
    } catch (error) {
        res.status(500).send({
            Msg: "failed to create order",
            error
        })
    }
}
exports.updateorder=async(req,res)=>{
    const user=req.user
try {
    if(user.role==="admin"){
        const updateorder= await orders.updateOne({
            _id:req.params.id},{$set:{...req.body}})
            res.status(200).send({msg:"order has been updated"}) 
    }
else{
    res.status(400).send({msg:"your are not allowed to change"})
}
    
} catch (error) {
    res.status(500).send({msg:"fail to update the following order",error})
}
}
exports.deleteorder=async(req,res)=>{
    const user=req.user
    try {
        if (user.role==="admin"){
            await orders.deleteOne({_id:req.params.id})   
            res.status(200).send({msg:"order has been deleted"}) 
        }
    } catch (error) {
    res.status(500).send({msg:"fail to delete",error})

    }
}
exports.getorders=async(req,res)=>{
    const user=req.user
    try {
        const allorders=await orders.find()
        res.status(200).send({msg:"the list of orders",orders:allorders})
        
    } catch (error) {
        res.status(500).send({msg:"fail to get",error})
    }
}








