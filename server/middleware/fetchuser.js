var jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config({path : '../config.env'});
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    const token = req.cookies['token'];
    console.log("cookies : ", req.cookies)
    console.log("TOKEN : ", token)
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.log("token error : " + error);
        return res.status(401).send({ error: error })
    }
}

module.exports = fetchuser;