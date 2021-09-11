const Team = require("../models/team.model");

exports.postTeam = (req, res, next) => {
    const newTeam = new Team({
        teamName: req.body.teamName
    });

    newTeam.save().then(() => {
        res.status(201).json({
            message: 'Team added successfully'
        });
    })
    .catch((error) => {
        res.status(500).json({
            message: "Failed to add team!"
        })
    });
}

exports.getTeams = (req, res, next) => {
    Team.find().then((fetchedTeams) => {
        res.status(200).json({
            message: 'Words fetched successfully!',
            teams: fetchedTeams
        });
    })
    .catch((error) => {
        res.status(500).json({
            message: "Failed to fetch words!"
        });
    });
}