'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * soulsoftware
 *
 * Author: bsorrentino
 *
 * AWS SAMPLES - ADD TODO
 */
const AWS = require("aws-sdk");
const uuid_1 = __importDefault(require("uuid"));
AWS.config.update({
    region: 'us-east-2'
});
const tableName = process.env.TABLE_NAME;
let dynamodb = new AWS.DynamoDB.DocumentClient();
function addTodo(todo) {
    return dynamodb.put({
        TableName: tableName,
        Item: todo,
        ReturnValues: 'ALL_OLD'
    }).promise();
}
// LAMDA FUNCTION
exports.handler = async (event, context /*, callback:Callback*/) => {
    const res = (code, body) => {
        return {
            statusCode: code,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: body
        };
    };
    try {
        let input = JSON.parse(event.body);
        console.log("addTodoFunction ", input, context);
        if (input) {
            if (!input.id)
                input.id = uuid_1.default.v1();
            let result = await addTodo(input);
            console.log("addTodoFunction", result);
            return res(200, JSON.stringify(input));
        }
        return res(400, "input invalid!");
    }
    catch (err) {
        return res(500, JSON.stringify(err));
    }
};
