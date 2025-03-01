const jwt = require('jsonwebtoken');
require('dotenv').config({path: './.env'});
const semilla = process.env.JWT_SECRET;

exports.generateToken = () => {
    // console.log(semilla)
    return jwt.sign({timestamp: Date.now()}, semilla, {expiresIn: '5m'});
};

exports.validateToken = (token) => {
    try {
        return jwt.verify(token, semilla);
    } catch (error) {
        return null;
    }
}