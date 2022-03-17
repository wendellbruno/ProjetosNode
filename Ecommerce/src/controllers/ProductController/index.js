const Product = require('../../models/Product')

const ProductController = {

    async createProduct(req,res){

        const bodyDate = req.body
        const { user_id } = req.params

        try{
            const data = { username: user_id, ...bodyDate}
            const newProduct = await Product.create(data)
            await newProduct.populate('username')
            return res.status(200).json(newProduct)
        }catch(erro){
            return res.status(400).send(erro)
        }

    },

    async getUsersProducts(req,res){
        const { user_id } = req.params
        try{
            const productOfAnUser = await Product.find({username : user_id})
            return res.status(200).json(productOfAnUser)
        }catch(erro){
            return res.status(400).send(erro)
        }
    },

    async updateProduct(req,res){
        const {...bodyData} = req.body;
        const { ...paramsData } = req.params
        try{
            const updatedProduct = await Product.findByIdAndUpdate(paramsData.product_id, bodyData, {new: true})
            res.status(200).json(updatedProduct)

        }catch(erro){
            return res.status(400).send(erro)
        }
    },

    async deleteProduct(req,res){
        
        const {...paramsData} = req.params
        try{
            const deleteProduct = await Product.findByIdAndDelete(paramsData.product_id)
            return res.status(200).json(deleteProduct)
        }catch(erro){
            return res.status(400).send(erro)
        }
    },

    async getProducts(req,res){
        try{
            const products = await Product.find()
            return res.status(200).json(products)
        }catch(erro){
            return res.status(400).send(erro)
        }
    },

    async getProductById(req,res){
        const {...paramsData} = req.params
        try{
            const product = await Product.findById(paramsData.product_id)
            return res.status(200).json(product)
        }catch(erro){
            return res.status(400).send(erro)
        }
    }




}

module.exports = ProductController