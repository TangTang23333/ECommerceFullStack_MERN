const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js");



// add user
router.post('/', verifyToken, async (req, res) => {


    // if password is updated, get the newly encryted password 
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC).toString();
    }

    const newUser = new User(req.body);
    // try add user else log err
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});



// update user
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {


    // if password is updated, get the newly encryted password 
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC).toString();
    }


    // try update user else log err
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true });

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }

});

//delete user 

router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted!');

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});


// get user 

router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        // do not show passwords!!!
        const { password, ...others } = user._doc;

        res.status(200).json(others);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});


// get all users 
router.get('/', verifyTokenAndAdmin, async (req, res) => {

    const query = req.query.new;
    try {
        const users = query
            ? await User.find().limit(5)
            : await User.find();

        res.status(200).json(users);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});



//get user stats 
router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
//{$group: {date: date.getMonth()}
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            // {
            //     $project: {
            //         month: { $month: "$createdAt" },
            //         year: { $year: "$createdAt" },
            //         total: 1

            //     }
            // },
            {$group: {
                _id : {
                month: { $month: "$createdAt" }, 
                year: { $year: "$createdAt" }} ,
                total: {$sum:1}
            }}
        ]);


    res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }


});







module.exports = router;

