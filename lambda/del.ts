
'use strict';
/**
 * soulsoftware
 *
 * Author: bsorrentino
 *
 * AWS SAMPLES - DELETE TODO
 */

import AWS = require('aws-sdk');
import { Handler, Context, APIGatewayProxyResult as APIResult } from 'aws-lambda';


AWS.config.update({
  region:'us-east-2'
});

const tableName = process.env.TABLE_NAME as string;

let dynamodb = new AWS.DynamoDB.DocumentClient();

function deleteTodo( id:string ) {

  dynamodb.delete( {
    TableName: tableName,
    Key:{ id:id }
  }).promise();

}

// LAMDA FUNCTION
export const handler: Handler = async ( event:any , context:Context /*, callback:Callback*/ )  => {
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

 console.log( "deleteTodoFunction ", input, context );

 if( input.id ) {
   let result = await deleteTodo( input.id );

   return res( 200, JSON.stringify(result) ) ;
 }
 return  res( 400, "input invalid!" ) ;

}
catch( err ) {
  return { statusCode:500, body: JSON.stringify(err) } ;
}

}
