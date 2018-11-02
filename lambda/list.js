'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
AWS.config.update({
    region: 'us-east-2'
});
const tableName = process.env.TABLE_NAME;
let dynamodb = new AWS.DynamoDB.DocumentClient();
function listTodo() {
    return dynamodb.scan({
        TableName: tableName
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
        console.log("listTodoFunction ", event, context);
        let result = await listTodo();
        if (result.Items) {
            let body = {
                count: result.Count,
                items: result.Items
            };
            return res(200, JSON.stringify(body));
        }
        ;
        return res(404, "nod data found!!");
    }
    catch (err) {
        return res(500, JSON.stringify(err));
    }
};
