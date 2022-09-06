const jwt = require('jsonwebtoken');

// Validation userId
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) { // Vérifier si userID correspond au token
            throw 'utilisateur pas valide';
        } else {
            next(); 
        }
    } catch (error) {
        res.status(401).json({ error });
    }
};