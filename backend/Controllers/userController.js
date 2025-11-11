const login = async (req, res) => {
    res.send("Logged In!");
}

const signup = async (req, res) => {
    res.send("Signed Up!");
}

module.exports = {
    login,
    signup
};