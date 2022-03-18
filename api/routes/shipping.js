const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();
const Shipping = require('../models/Shipping');


//create shipping

router.post('/', verifyToken, async (req, res) => {
    const newShipping = new Shipping(req.body);

    console.log('new shipping:', newShipping);
    try {
        console.log(req.body);
        const savedShipping = await newShipping.save();
        res.status(200).json(savedShipping);

    } catch (err) {

        res.status(500).json(err);
    }
});

// update shipping
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {

    // try update shipping 
    try {
        const updatedShipping = await Shipping.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true });

        res.status(200).json(updatedShipping);
    } catch (err) {
        res.status(500).json(err);
    }

});

//delete shipping

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Shipping.findByIdAndDelete(req.params.id);
        res.status(200).json('Shipping has been deleted!');

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});


// get one shipping details 

router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const shipping = await Shipping.findById(req.params.id);
        res.status(200).json(shipping);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});
// get shipping of one customer

router.get('/find/:UserId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const shippings = await Shipping.find({ userId: req.params.userId });
        res.status(200).json(shippings);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});


// get all Shippings
router.get('/', verifyTokenAndAdmin, async (req, res) => {

    try {
        const shippings = await Shipping.find();
        res.status(200).json(shippings);
    } catch (err) {
        res.status(500).json(err);

    }
});






module.exports = router;




