'use strict';

const fs = require("fs");
const util = require('util')
const readAsync = util.promisify(fs.readFile);

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