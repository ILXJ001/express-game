'use strict';
const mysqlQuery = require("../game_util").mysqlQuery;

class common {
    constructor() {
    }

    async query(UserId) {
        let sSql = "SELECT UserID,PasswordMD5,Name,Friends,Signature,CreateTime,DefaultFriendCatalog,Version FROM gguser WHERE UserID = ?";
        return await mysqlQuery(sSql, UserId);
    }
}

module.exports = common;