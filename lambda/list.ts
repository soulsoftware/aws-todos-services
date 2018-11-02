'use strict';

import AWS = require('aws-sdk');
import { Handler, Context, Callback, APIGatewayProxyResult as APIResult } from 'aws-lambda';

AWS.config.update({
  region:'us-east-2'
});

const tableName = process.env.TABLE_NAME as string;

let dynamodb = new AWS.DynamoDB.DocumentClient();

type Todo = {
  Id:string;
  Title:String;
}

function listTodo() {

  return dynamodb.scan( {
    TableName: tableName
  }).promise();

}

// LAMDA FUNCTION
export const handler: Handler<APIResult> = async ( event:any , context:Context /*, callback:Callback*/ )  => {

  const res = ( code:number, body:any ):APIResult => {
    return {
      statusCode:code,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: body
  }};

  try {

   console.log( "listTodoFunction ", event, context );

   let result = await listTodo();

   if( result.Items ) {

     let body = {
       count: result.Count,
       items: result.Items
     }
     return  res( 200, JSON.stringify( body ) )
     } ;

   return  res( 404, "nod data found!!" );

  }
  catch( err ) {
    return  res( 500, JSON.stringify(err) );
  }


}
