const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();
const Order = require('../models/Order');


//create order

router.post('/', verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);

    console.log('new order:', newOrder);
    try {
        console.log(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);

    } catch (err) {

        res.status(500).json(err);
    }
});

// update order
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {

    // try update order 
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true });

        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }

});

//delete order

router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json('Order has been deleted!');

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});


// get one order details 

router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});
// get order of one customer

router.get('/find/:UserId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        res.status(200).json(orders);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});


// get all Orders
router.get('/', verifyTokenAndAdmin, async (req, res) => {

    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);

    }
});



// get monthly sales amount
router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));


    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    ...(productId && {
                        products: { $elemMatch: { productId } },
                    }),
                }
            },
            {
                //  take month and amount
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                },
            },
            // output form
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            }
        ]);

        res.status(200).json(income);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});




module.exports = router;




