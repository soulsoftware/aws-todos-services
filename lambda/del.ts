
'use strict';
/**
 * soulsoftware
 *
 * Author: bsorrentino
 *
 * AWS SAMPLES - DELETE TODO
 */

import AWS = require('aws-sdk');
import { Handler, Context, Callback, APIGatewayProxyResult as APIResult } from 'aws-lambda';


AWS.config.update({
  region:'us-east-2'
});

const tableName = process.env.TABLE_NAME as string;

let dynamodb = new AWS.DynamoDB.DocumentClient();

function deleteTodo( key:string ) {

  dynamodb.delete( {
    TableName: tableName;
  })
  return dynamodb.put( {
    TableName: tableName,
    Item: item
  }).promise();

}

// LAMDA FUNCTION
export const handler: Handler = async ( event:any , context:Context /*, callback:Callback*/ )  => {

try {
  let input = JSON.parse( event.body );

 console.log( "addTodoFunction ", input, context );

 if( input.name ) {
   let result = await addTodo( input.name );

   return  { statusCode:200, body: JSON.stringify(result) } ;
 }
 return  { statusCode:400, body: "input invalid!" } ;

}
catch( err ) {
  return { statusCode:500, body: JSON.stringify(err) } ;
}

}
