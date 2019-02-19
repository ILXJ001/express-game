'use strict';

const app = require("express");
const router = app.Router();
const querystring = require('querystring');
const common = require("../model/common");


router.get("/", async (req, res) => {
    let oCommon = new common();
    let dataList = await oCommon.query("congya001");
    res.json(dataList);

});

router.post("/test", function (req, res) {
    let str = "";
    req.on("data", function (data) {
        str += data;
    });
    req.on("end", function () {
        let sData = querystring.parse(str);
        res.send("common");
    });
});

module.exports = router;