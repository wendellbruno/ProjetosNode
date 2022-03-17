const Cart = require('../../models/Cart')

const CartController = {

    async createCart(req,res){
        const bodyDate = req.body
        const {user_id} = req.params
        try{
            const createdCart = await Cart.create({...bodyDate, username: user_id})
            await createdCart.populate('products')
            return res.status(200).json(createdCart)

        }catch(erro){
            console.log(erro)
            return res.status(400).json(erro)
        }
        
    },

    async getUserCarts(req,res){
        const {user_id} = req.params
        try{
            const userCarts = await Cart.find({username: user_id}).populate('username').populate('products')
            return res.status(200).json(userCarts)

        }catch(erro){
            return res.status(400).json(erro)
        }
    },

    async getCart(req,res){
        const { cart_id } = req.params
        try{

            const cart = await Cart.findById(cart_id).populate('products')
            return res.status(200).json(cart)

        }catch(erro){
            return res.status(400).json(erro)
        }
    }

}

module.exports = CartController