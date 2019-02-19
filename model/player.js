'use strict';

const mysqlQuery = require("../game_util").mysqlQuery;

class player {
    constructor() {
    }

    async query(UserId) {
        let sSql = "SELECT UserID,Name,Friends FROM gguser WHERE UserID = ?";
        return await mysqlQuery(sSql, UserId);
    }

}

module.exports = player;