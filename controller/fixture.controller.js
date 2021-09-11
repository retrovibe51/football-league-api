const Fixture = require("../models/fixture.model");


exports.getFixtures = (req, res, next) => {

    const currentPage = +req.query.currentpage;

    const teamId = req.params.teamId;

    const fixtureQuery = Fixture.find({ $or: [{ 'homeTeamId': teamId }, { 'awayTeamId': teamId }] })
        .sort('fixtureDate');

    if(currentPage) {
        fixtureQuery
            .skip(10 * (currentPage - 1))
            .limit(10);
    }

    fixtureQuery.then((fetchedFixtures) => {
        res.status(200).json({
            message: 'Fixtures fetched successfully!',
            fixtures: fetchedFixtures
        });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            message: "Failed to fetch fixtures!"
        });
    });
}


exports.updateFixture = (req, res, next) => {

    console.log(req.query.homeTeamId);

    const homeTeamId = req.query.homeTeamId;
    const awayTeamId = req.query.awayTeamId;

    const score = req.body.score;

    console.log(homeTeamId);

    Fixture.findOne({ homeTeamId: homeTeamId, awayTeamId: awayTeamId }).then((fetchedFixture) => {
        if(fetchedFixture.isMatchPlayed) {
            res.status(500).json({ message: "Match has already been played" });
        }
        else {
            Fixture.updateOne({ homeTeamId: homeTeamId, awayTeamId: awayTeamId }, { score: score, isMatchPlayed: true }).then((result) => {        
                res.status(200).json({ message: "Updated Successfully!" });    
            });
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            message: "Failed to update the post!"
        });
    });
}


exports.postFixture = (req, res, next) => {
    const newFixture = new Fixture({
        fixtureDate: req.body.fixtureDate,
        homeTeamId: req.body.homeTeamId,
        awayTeamId: req.body.awayTeamId,
        score: "Fixture not yet played",
        isMatchPlayed: false
    });

    newFixture.save().then(() => {
        res.status(201).json({
            message: 'Fixture added successfully'
        });
    })
    .catch((error) => {
        res.status(500).json({
            message: "Failed to add fixture!"
        })
    });
}