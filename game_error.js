"use strict";
let stringify = require('json-stringify-safe');
module.exports = {
    //此处存放错误码常量
};

//重写console.log
const DEBUG_FLAG = true;

(() => {
    let log = console.log;
    console.log = function () {
        let first_parameter = arguments[0];
        let other_parameters = Array.prototype.slice.call(arguments, 1);
        let data = {};
        data.method = "";
        data.path = "";
        data.line = "";
        data.pos = "";
        if (DEBUG_FLAG) {
            let stacklist = (new Error()).stack.split('\n').slice(2);
            let s = stacklist[0]
            let stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
            let stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
            let sp = stackReg.exec(s) || stackReg2.exec(s);

            data.method = sp[1];
            data.path = sp[2];
            data.line = sp[3];
            data.pos = sp[4];
        }

        function formatConsoleDate(date) {
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let minutes = date.getMinutes();
            let seconds = date.getSeconds();
            let milliseconds = date.getMilliseconds();

            return '[' + year + '-' + ((month < 10) ? '0' + month : month) + '-' + ((day < 10) ? '0' + day : day) + ' ' +
                ((hour < 10) ? '0' + hour : hour) +
                ':' +
                ((minutes < 10) ? '0' + minutes : minutes) +
                ':' +
                ((seconds < 10) ? '0' + seconds : seconds) +
                '.' +
                ('00' + milliseconds).slice(-3) +
                '] ' + data.path + ":" + data.line + " ";
        }

        log.apply(console, [formatConsoleDate(new Date()) + (typeof(first_parameter) == 'object' ? stringify(first_parameter) : first_parameter)].concat(other_parameters));
    };
})();