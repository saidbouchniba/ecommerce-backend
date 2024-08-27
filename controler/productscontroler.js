const products=require("../model/productschema")
exports.addshirt=async(req,res)=>{
    try {
        const shirt= new products(req.body)
        await shirt.save()
        res.status(200).send({
            Msg:"shirt is added",
            shirt
        })
    } catch (error) {
        res.status(500).send({
            Msg:"shirt is not added",
            error
        })

    }
}
exports.getshirts=async(req,res)=>{
    try {
        const shirts=await products.find()
        res.status(200).send({
            Msg:"this is the list of tshirts in the storage",
            shirts
        })
    } catch (error) {
        res.status(500).send({
            Msg:"falied to get the list",
            error
        })
    }
}
exports.deleteshirt=async(req,res)=>{
    try {
      await products.deleteOne({
        _id:req.params._id

      }) 
      res.status(200).send({
        Msg:"shirt deleted"

      }) 
    } catch (error) {
        res.status(500).send({
            Msg:"failed delete",
            error
        })
    }
}
exports.updateshirt=async(req,res)=>{
    try {
       const shirt=await products.updateOne({
        _id:req.params._id
       },{
        $set:{
           ... req.body
        }
       })
    res.status(200).send({
        Msg:"shirt updated",
        shirt
    })
    
    } catch (error) {
        res.status(500).send({
            Msg:"failed update",
            error
        })
    }
}