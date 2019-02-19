'use strict';

const app = require("express");
const router = app.Router();
const player = require("../model/player");

router.get("/", async (req, res) => {
    let oPlayer = new player();
    let dataList = await oPlayer.query("congya002");
    res.json(dataList);
});

router.post("/test", function (req, res) {
    let str = "";
    req.on("data", function (data) {
        str += data;
    });
    req.on("end", function () {
        let sData = querystring.parse(str);
        res.send("player");
    });
});

module.exports = router;