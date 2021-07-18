"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipaddr = void 0;
const https_1 = __importDefault(require("https"));
let ipaddr = '';
exports.ipaddr = ipaddr;
var callback = function (err, ip) {
    if (err) {
        return console.log(err);
    }
    return exports.ipaddr = ipaddr = ip;
    // do something here with the IP address
};
https_1.default.get({
    host: 'api.ipify.org',
}, function (response) {
    var ip = '';
    response.on('data', function (d) {
        ip += d;
    });
    response.on('end', function () {
        if (ip) {
            callback(null, ip);
        }
        else {
            callback('could not get public ip address :(', 'thanks');
        }
    });
});
