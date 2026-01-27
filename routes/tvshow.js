const express = require("express");
const tvShowRouter = express.Router();

tvShowRouter.get("/api/tv", (req, res) => {
    try {
        res.json({})

    } catch (e) {
        console.log(e);
        res.status(500).send({error: e.message});
    }
})