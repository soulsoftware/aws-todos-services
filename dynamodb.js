"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require("inquirer");
var AWS = require("aws-sdk");
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2'
});
var dynamodb = new AWS.DynamoDB();
var prompt = inquirer.createPromptModule();
var cmd;
(function (cmd) {
    cmd[cmd["LIST_TABLES"] = 1] = "LIST_TABLES";
    cmd[cmd["CREATE_TABLES"] = 2] = "CREATE_TABLES";
    cmd[cmd["DELETE_TABLES"] = 3] = "DELETE_TABLES";
    cmd[cmd["DESCRIBE_TABLES"] = 4] = "DESCRIBE_TABLES";
})(cmd || (cmd = {}));
function waitForCommand() {
    return __awaiter(this, void 0, void 0, function () {
        var res, _a, res_1, res_2, res_3, res_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, prompt({
                        name: "command",
                        type: "list",
                        choices: [
                            { name: "List Tables", value: cmd.LIST_TABLES },
                            { name: "Create Table", value: cmd.CREATE_TABLES },
                            { name: "Describe Table", value: cmd.DESCRIBE_TABLES },
                            { name: "Delete Table", value: cmd.DELETE_TABLES },
                            { name: "Exit", value: 0 }
                        ]
                    })];
                case 1:
                    res = _b.sent();
                    _a = res.command;
                    switch (_a) {
                        case cmd.LIST_TABLES: return [3 /*break*/, 2];
                        case cmd.CREATE_TABLES: return [3 /*break*/, 4];
                        case cmd.DELETE_TABLES: return [3 /*break*/, 6];
                        case cmd.DESCRIBE_TABLES: return [3 /*break*/, 8];
                    }
                    return [3 /*break*/, 10];
                case 2: return [4 /*yield*/, listTables()];
                case 3:
                    res_1 = _b.sent();
                    console.log(res_1);
                    return [3 /*break*/, 11];
                case 4: return [4 /*yield*/, createTables()];
                case 5:
                    res_2 = _b.sent();
                    console.log(res_2);
                    return [3 /*break*/, 11];
                case 6: return [4 /*yield*/, deleteTables()];
                case 7:
                    res_3 = _b.sent();
                    console.log(res_3);
                    _b.label = 8;
                case 8: return [4 /*yield*/, describeTables()];
                case 9:
                    res_4 = _b.sent();
                    console.dir(res_4, { depth: 3 });
                    return [3 /*break*/, 11];
                case 10:
                    process.exit();
                    return [3 /*break*/, 11];
                case 11:
                    waitForCommand();
                    return [2 /*return*/];
            }
        });
    });
}
function createTables() {
    var schema = require('./dynamodb/schema.json');
    return dynamodb.createTable(schema).promise();
}
function deleteTables() {
    return dynamodb.deleteTable({ TableName: 'todo' }).promise();
}
function listTables() {
    return dynamodb.listTables().promise();
}
function describeTables() {
    return dynamodb.describeTable({ TableName: 'todo' }).promise();
}
waitForCommand();
