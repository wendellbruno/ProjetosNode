const { Router } = require('express')
const router = Router()

const UserController = require('../controllers/UserController')
const LoginController = require('../controllers/login')
const ProductController = require('../controllers/ProductController')
const CartController = require('../controllers/CartController')
const { authenticate } = require('../middlewares/')
router.get('/', (req,res) =>{
    res.send('olá mundo')
})

router.post('/users', UserController.createUser)
router.get('/users', UserController.getUsers)
router.get('/users/:user_id', UserController.getUserById)

router.post('/login', LoginController.createSeassion)

router.post('/products/:user_id', authenticate, ProductController.createProduct)
router.get('/products/:user_id', ProductController.getUsersProducts)
router.get('/products', ProductController.getProducts)

router.patch('/products/:user_id/:product_id', authenticate, ProductController.updateProduct)
router.delete('/products/:user_id/:product_id', authenticate, ProductController.deleteProduct)

router.get('/product/:product_id', ProductController.getProductById)

router.post('/carts/:user_id', authenticate, CartController.createCart)
router.get('/carts/:user_id', authenticate, CartController.getUserCarts)
router.get('/carts/:user_id/:cart_id', authenticate, CartController.getCart)





module.exports = router;