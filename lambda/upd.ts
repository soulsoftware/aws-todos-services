'use strict';
/**
 * soulsoftware
 *
 * Author: bsorrentino
 *
 * AWS SAMPLES - UPDATE TODO
 */

import AWS = require('aws-sdk');
import { Handler, Context, APIGatewayProxyResult as APIResult } from 'aws-lambda';


AWS.config.update({
  region:'us-east-2'
});

const tableName = process.env.TABLE_NAME as string;

let dynamodb = new AWS.DynamoDB.DocumentClient();

type Todo = {
  id:string;
  title:string;
  complete:boolean;
  [k:string]:any;
}

function updateTodo( todo:Todo ) {

  var fields:Array<string> = [] ;
  var values:{ [k:string] : any} = {};

  if( todo.title!==undefined ) {
    fields.push('title = :title');
    values[':title'] = todo.title;
  }

  if( todo.complete!==undefined ) {
    fields.push("complete = :complete");
    values[':complete'] = todo.complete;
  }

  return dynamodb.update( {
    TableName: tableName,
    Key: { id: todo.id },
    UpdateExpression: "SET " + fields.join(','),
    ExpressionAttributeValues: values
  }).promise();

}

// LAMDA FUNCTION
export const handler: Handler<APIResult> = async ( event:any , context:Context /*, callback:Callback*/ )  => {

  const res = ( code:number, body:string ):APIResult => {
    return {
      statusCode:code,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: body
  }};

  try {
    let input = JSON.parse( event.body );

   console.log( "updateTodoFunction ", input, context );

   if( input ) {
     let result = await updateTodo( input );

     return  res(200, JSON.stringify(result) ) ;
   }
   return  res( 400, "input invalid!" ) ;

  }
  catch( err ) {
    return res( 500, JSON.stringify(err) ) ;
  }

}
