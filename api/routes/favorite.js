const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const router = require('express').Router();
const Favorite = require('../models/Favorite');


//create favorite

router.post('/', verifyToken, async (req, res) => {
    const newFavorite = new Favorite(req.body);

    try {
        console.log(req.body);
        const savedFavorite = await newFavorite.save();
        res.status(200).json(savedFavorite);
        console.log('favorite created!');

    } catch (err) {
        res.status(500).json(err);
    }
});

// update favorite
router.put('/:id', verifyToken, async (req, res) => {

    // try update favorite 
    try {
        const updatedFavorite = await Favorite.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true });

        res.status(200).json(updatedFavorite);
        console.log('favorite updated!');
    } catch (err) {
        res.status(500).json(err);
    }

});

//delete favorite

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Favorite.findByIdAndDelete(req.params.id);
        res.status(200).json('Favorite has been deleted!');

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});



// get user favorite
router.get('/find/:userId', verifyToken, async (req, res) => {
    try {
        const favorite = await Favorite.find({userId: req.params.userId});
        res.status(200).json(favorite);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});


// get all Favorites
router.get('/', verifyTokenAndAdmin, async (req, res) => {

    try {
        let favorites;
        favorites = await Favorite.find();
        res.status(200).json(favorites);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);

    }
});


module.exports = router;



