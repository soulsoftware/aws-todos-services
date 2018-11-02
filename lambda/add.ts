'use strict';
/**
 * soulsoftware
 *
 * Author: bsorrentino
 *
 * AWS SAMPLES - ADD TODO
 */

import AWS = require('aws-sdk');
import uuid from "uuid";
import { Handler, Context, Callback, APIGatewayProxyResult as APIResult } from 'aws-lambda';


AWS.config.update({
  region:'us-east-2'
});

const tableName = process.env.TABLE_NAME as string;

let dynamodb = new AWS.DynamoDB.DocumentClient();

type Todo = {
  id:string;
  title:string;
  [k:string]:any
}

function addTodo( todo:Todo ) {

  if( !todo.id ) todo.id = uuid.v1();

  return dynamodb.put( {
    TableName: tableName,
    Item: todo
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
    let input = JSON.parse( event.body );

   console.log( "addTodoFunction ", input, context );

   if( input ) {
     let result = await addTodo( input );

     return  res(200, JSON.stringify(result) ) ;
   }
   return  res( 400, "input invalid!" ) ;

  }
  catch( err ) {
    return res( 500, JSON.stringify(err) ) ;
  }

}
