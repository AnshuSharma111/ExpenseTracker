const user_db_services = require('../Services/user.js');
const token_db_services = require('../Services/blacklist.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const signup = async (req, res) => {
    try {
        const data = req.body;

        if (!data?.username || !data?.password) {
            console.error("Invalid Data!");
            return res.status(422).json({
                success : false,
                description : "Invalid Data!"
            });
        }        

        const existing_user = await user_db_services.getUserByUsername(data.username);
        if (existing_user != null) {
            console.error("User with username already exists!");
            return res.status(409).json({
                success : false,
                description : "User with username already exists!"
            });
        }

        const hashed_pass = await bcrypt.hash(data.password, 10);
        const new_user = { username : data.username, password : hashed_pass};
        const id = await user_db_services.createUser(new_user);

        const token = jwt.sign({ user_id : id, username : data.username }, process.env.JWT_SECRET, { expiresIn : '24h' });

        console.log(`Successfully created new User!`);
        return res.status(201).json({
            success : true,
            description : "Successfully created new User!",
            id : id,
            token : token
        });
    } catch (e) {
        console.error(`Unable to sign user up!\n\nError : ${e}`);
        res.status(500).json({
            success : false,
            description : "Internal Server Error"
        });
    }
};

const login = async (req, res) => {
    try {
        const data = req.body;

        if (!data?.username || !data?.password) {
            console.error("Invalid Data!");
            return res.status(422).json({
                success : false,
                description : "Invalid Data!"
            });
        }

        const existing_user = await user_db_services.getUserByUsername(data.username);
        if (existing_user == null) {
            console.error("Invalid Login!");
            return res.status(401).json({
                success : false,
                description : "Invalid Login!"
            });
        }

        const hashed_pass = existing_user.password;
        const id_match = await bcrypt.compare(data.password, hashed_pass);

        if (!id_match) {
            console.error("Invalid Login!");
            return res.status(401).json({
                success : false,
                description : "Invalid Login!"
            });
        }

        const token = jwt.sign({ user_id : existing_user._id, username : existing_user.username }, process.env.JWT_SECRET, { expiresIn : '24h' });

        console.log(`Successfully logged user in!`);
        res.status(200).json({
            success : true,
            description : "User logged in!",
            id : existing_user._id,
            token : token
        });

    } catch (e) {
        console.error(`Unable to log user in!\n\nError : ${e}`);
        res.status(500).json({
            success : false,
            description : "Internal Server Error"
        });
    }
};

const logout = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.error("Unauthorized Access!");
            return res.status(401).json({ 
                success: false,
                description: "Unauthorized Access!" 
            });
        }

        const token = authHeader.split(" ")[1];
        const id = await token_db_services.createNewBlacklistToken(token);

        console.log("Successfully logged user out!");
        res.status(200).json({
            success : true,
            description : "Successfully logged user out!",
            id : id
        });
    } catch (e) {
        console.error(`Unable to log user out!\n\nError : ${e}`);
        res.status(500).json({
            success : false,
            description : "Internal Server Error"
        });
    }
};

module.exports = {
    login,
    signup,
    logout
};