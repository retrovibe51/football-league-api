const mongoose = require('mongoose');

const fixtureSchema = mongoose.Schema({
    fixtureDate: { type: Date, required: true },
    // homeTeam: { type: String, required: true },
    // awayTeam: { type: String, required: true },
    homeTeamId: { type: String, required: true },
    awayTeamId: { type: String, required: true },
    score: { type: String, required: false },
    isMatchPlayed: { type: Boolean, required: false }
});

module.exports = mongoose.model('Fixture', fixtureSchema);