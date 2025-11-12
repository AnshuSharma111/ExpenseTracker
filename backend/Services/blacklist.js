const { blacklistModel: Blacklist } = require("../Models/blacklist.js");

const createNewBlacklistToken = async (token) => {
    const new_blacklist_token = new Blacklist({token});
    const new_token_data = await new_blacklist_token.save();
    return new_token_data._id;
};

const isBlacklistToken = async (token) => {
    const blacklisted_token = await Blacklist.find({ token });
    return blacklisted_token.length > 0;
};

module.exports = {
    createNewBlacklistToken,
    isBlacklistToken
};