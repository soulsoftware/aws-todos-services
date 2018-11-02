'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * soulsoftware
 *
 * Author: bsorrentino
 *
 * AWS SAMPLES - UPDATE TODO
 */
const AWS = require("aws-sdk");
AWS.config.update({
    region: 'us-east-2'
});
const tableName = process.env.TABLE_NAME;
let dynamodb = new AWS.DynamoDB.DocumentClient();
function updateTodo(todo) {
    var fields = [];
    var values = {};
    if (todo.title !== undefined) {
        fields.push('title = :title');
        values[':title'] = todo.title;
    }
    if (todo.complete !== undefined) {
        fields.push("complete = :complete");
        values[':complete'] = todo.complete;
    }
    return dynamodb.update({
        TableName: tableName,
        Key: { id: todo.id },
        UpdateExpression: "SET " + fields.join(','),
        ExpressionAttributeValues: values
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
        console.log("updateTodoFunction ", input, context);
        if (input) {
            let result = await updateTodo(input);
            return res(200, JSON.stringify(result));
        }
        return res(400, "input invalid!");
    }
    catch (err) {
        return res(500, JSON.stringify(err));
    }
};
