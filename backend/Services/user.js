const { user : User } = require('../Models/user.js'); 

const createUser = async (data) => {
    const new_user = new User(data);
    const new_user_data = await new_user.save();
    return new_user_data._id;
};

const deleteUserById = async (id) => {
    return await User.findByIdAndDelete(id);
};

const getUserById = async (id) => {
    return await User.findOne({_id : id});
};

const getUserByUsername = async (username) => {
    return await User.findOne({username : username});
};

const getAllUsers = async () => {
    return await User.find();
};

const updateUserById = async (id, data) => {
    return User.findByIdAndUpdate(id, data, {new : true});
};

module.exports = {
    createUser,
    deleteUserById,
    getUserById,
    getUserByUsername,
    getAllUsers,
    updateUserById
};