'use strict';

const dbMysqlConfig = require('./config/config').mysqlConfig;
const fs = require("fs");
const util = require('util');
const readAsync = util.promisify(fs.readFile);
const mysql = require("mysql");

//通用函数

//读取json文件
module.exports.loadJsonFile = async (file) => {
    try {
        let fileData = await readAsync(file);
        fileData = JSON.parse(fileData);
        return fileData;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const pool = mysql.createPool({
    connectionLimit: 10,
    host: dbMysqlConfig.host,
    user: dbMysqlConfig.username,
    password: dbMysqlConfig.password,
    database: dbMysqlConfig.database
});

module.exports.mysqlQuery = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
};

