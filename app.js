const express = require("express");
const mongoose = require("mongoose");

const fixtureRoutes = require("./routes/fixtures-routes");
const teamRoutes = require("./routes/team-routes");

const app = express();
app.use(express.json());

// MongoDB Atlas Connection
mongoose.connect("mongodb+srv://Chuck:" + process.env.MONGO_ATLAS_PWD + "@cluster0.xmjgz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ 
    useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch((err) => {
        console.log(err);
        console.log('Connecttion to MongoDB failed');
    });


// BOC - CORS MIDDLEWARE
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
// EOC - CORS MIDDLEWARE


app.use("/api/teams", teamRoutes);
app.use("/api/fixtures", fixtureRoutes);


// app.listen(3000, () => {     // commented code as part of production changes
//     console.log("Server is listening on port 3000");
// })

module.exports = app;