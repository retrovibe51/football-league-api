const express = require("express");

const router = express.Router();

const TeamController = require("../controller/team.controller");


// HTTP POST - to fetch teams
router.post("", TeamController.postTeam);

// HTTP GET - to fetch teams
router.get("", TeamController.getTeams);

module.exports = router;