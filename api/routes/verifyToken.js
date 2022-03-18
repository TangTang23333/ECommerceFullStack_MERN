const jwt = require('jsonwebtoken');
const JWT_SEC = process.env.JWT_SEC;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;

    
    if (authHeader) {

        const token = authHeader.split(' ')[1];

        jwt.verify(token, JWT_SEC, (err, user) => {
            if (err) res.status(401).json('Token is not valid!');
            req.user = user;
            next();
        });

    } else {

        return res.status(401).json('You are not authenticated!');
    }
};


const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id == req.params.id ) {
            next();
        } else {
            res.status(403).json('You are not allowed to do this!');
        }
    });
};


const verifyTokenAndAdmin = (req, res, next) => { 
    verifyToken(req, res, ()=>{

        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json('Only admin is authorized to do so!');
        }
    });

};


module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };

