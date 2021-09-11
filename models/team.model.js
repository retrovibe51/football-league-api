const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
    teamName: { type: String, required: true }
});

module.exports = mongoose.model('Team', teamSchema);