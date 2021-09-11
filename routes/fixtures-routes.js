const express = require("express");

const router = express.Router();

const FixtureController = require("../controller/fixture.controller");


// HTTP GET - to fetch fixtures
router.get("/:teamId", FixtureController.getFixtures);

// HTTP POST - to create a fixture
router.post("", FixtureController.postFixture);

// HTTP PUT - to update fixture score
router.put("", FixtureController.updateFixture);

module.exports = router;