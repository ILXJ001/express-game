'use strict';

const PORT = 8080;
const express = require("express");
const app = express();

const loadFile = require("./game_util").loadJsonFile;
const gameError = require("./game_error");

//引入路由模块
const common = require("./router/common");
const player = require("./router/player");

//http接口
app.use("/",common);
app.use("/player",player);

app.listen(PORT);
console.log('Server listening on ' + PORT);