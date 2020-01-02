const db = require("../models")

module.exports = function (app) {
    //use app to set up api routes
    //route to add new burger
    app.post("/api/burgers", async function (req, res) {
        const burger = await db.Burgers.create({ burgerName: req.body.burgerName })
        res.json(burger);
    })

    //route to display burgers
    app.get("/api/burgers", async function (req, res) {
        const burger = await db.Burgers.findAll({})
        console.log(burger)
        res.json(burger);
    })

};