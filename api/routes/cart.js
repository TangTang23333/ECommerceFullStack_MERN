const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();
const Cart = require('../models/Cart');


//create cart

router.post('/', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try {

        console.log(req.body);
        const savedCart = await newCart.save();
        

        res.status(200).json(savedCart);
        console.log('user cart created!');

    } catch (err) {
        res.status(500).json(err);
        console.log('create cart err:', err);
        
    }
});

// update cart
router.put('/:id', verifyToken, async (req, res) => {

    // try update cart 
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true });

        res.status(200).json(updatedCart);
        console.log('user cart updated!');
    } catch (err) {
        res.status(500).json(err);
        console.log('user cart updated err');
    }

});

//delete cart

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json('Cart has been deleted!');

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});



// get user cart
router.get('/find/:userId', verifyToken, async (req, res) => {
    try {
        const cart = await Cart.find({userId: req.params.userId});
        console.log('user cart found', cart);
        res.status(200).json(cart);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        console.log('found user cart err:', err);

    }
});


// get all Carts
router.get('/', verifyTokenAndAdmin, async (req, res) => {

    try {
        let carts;
        carts = await Cart.find();
        res.status(200).json(carts);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});


module.exports = router;



