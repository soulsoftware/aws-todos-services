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
function deleteTodo(id) {
    dynamodb.delete({
        TableName: tableName,
        Key: { id: id }
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
        console.log("deleteTodoFunction ", input, context);
        if (input.id) {
            let result = await deleteTodo(input.id);
            return res(200, JSON.stringify(result));
        }
        return res(400, "input invalid!");
    }
    catch (err) {
        return { statusCode: 500, body: JSON.stringify(err) };
    }
};
