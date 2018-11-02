'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * soulsoftware
 *
 * Author: bsorrentino
 *
 * AWS SAMPLES - DELETE TODO
 */
const AWS = require("aws-sdk");
AWS.config.update({
    region: 'us-east-2'
});
const tableName = process.env.TABLE_NAME;
let dynamodb = new AWS.DynamoDB.DocumentClient();
function deleteTodo(key) {
    dynamodb.delete({
        TableName: tableName
    });
    return dynamodb.put({
        TableName: tableName,
        Item: item
    }).promise();
}
// LAMDA FUNCTION
exports.handler = async (event, context /*, callback:Callback*/) => {
    try {
        let input = JSON.parse(event.body);
        console.log("addTodoFunction ", input, context);
        if (input.name) {
            let result = await addTodo(input.name);
            return { statusCode: 200, body: JSON.stringify(result) };
        }
        return { statusCode: 400, body: "input invalid!" };
    }
    catch (err) {
        return { statusCode: 500, body: JSON.stringify(err) };
    }
};
