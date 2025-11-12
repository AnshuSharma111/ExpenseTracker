const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db_services = require("../Services/blacklist.js");

dotenv.config();

const authenticate = async (req, res, next) => {
    try {
        const headers = req.headers;
        const auth = headers.authorization;

        if (!auth || typeof auth !== 'string' || !auth.startsWith("Bearer ")) {
            console.error("Unauthorized Access!");
            return res.status(401).json({
                success : false,
                description : "Unauthorized Access!"
            });
        }

        const token = auth.split(" ")[1];

        const is_blacklisted = await db_services.isBlacklistToken(token);
        if (is_blacklisted) {
            console.error("Unauthorized Access!");
            return res.status(401).json({
                success : false,
                description : "Unauthorized Access!"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        console.log("Valid Token! Proceeding...");
        next();

    } catch (e) {
        if (e.name === "TokenExpiredError" || e.name === "JsonWebTokenError") {
            console.error("Unauthorized Access!");
            return res.status(401).json({
                success : false,
                description : "Unauthorized Access!"
            });
        }

        console.error("Internal Server Error!");
        return res.status(500).json({
            success : false,
            description : "Internal Server Error"
        });
    }
}

module.exports = {
    authenticate
}