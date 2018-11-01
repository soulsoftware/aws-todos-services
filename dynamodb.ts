import inquirer = require('inquirer');
import AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region:'us-east-2'
});


let dynamodb = new AWS.DynamoDB();


let prompt = inquirer.createPromptModule();

enum cmd {
  LIST_TABLES = 1, CREATE_TABLES, DELETE_TABLES, DESCRIBE_TABLES
}

async function waitForCommand() {

  let res:any = await prompt( {
    name: "command",
    type: "list",
    choices:[
      { name:"List Tables", value:cmd.LIST_TABLES} ,
      { name:"Create Table", value:cmd.CREATE_TABLES },
      { name:"Describe Table", value:cmd.DESCRIBE_TABLES },
      { name:"Delete Table", value:cmd.DELETE_TABLES },
      { name:"Exit", value:0 }
    ]});

  switch( res.command ) {
    case cmd.LIST_TABLES:
    {
      let res = await listTables();
      console.log(res);
    }
    break;
    case cmd.CREATE_TABLES:
    {
      let res = await createTables();
      console.log(res);
    }
    break;
    case cmd.DELETE_TABLES:
    {
      let res = await deleteTables();
      console.log(res);
    }
    case cmd.DESCRIBE_TABLES:
    {
      let res = await describeTables();
      console.dir(res, { depth: 3 });
    }
    break
    default:
      process.exit();
      break;
  }

  waitForCommand();

}

function createTables() {
  const schema = require( './dynamodb/schema.json');
  return dynamodb.createTable( schema ).promise()

}

function deleteTables() {
  return dynamodb.deleteTable( { TableName: 'todo' } ).promise();
}

function listTables() {
  return dynamodb.listTables().promise();
}

function describeTables() {
  return dynamodb.describeTable( { TableName: 'todo' } ).promise();
}

waitForCommand();
