const authenticate = async (req, res, next) => {
    console.log("Authentication middleware applied.");
    next();
}

module.exports = {
    authenticate
}