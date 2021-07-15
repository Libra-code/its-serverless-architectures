'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

module.exports.list = (event, context, callback) => {

  sleep(5000).then(() => {
    const params = {
      TableName: process.env.MOVIES_TABLE
    };
    
  var title="";
  var director="";
  
  const request = event.queryStringParameters;
  console.log(params);
  console.log("prova request: "+request);

  if(request && request.title)
  {
    console.log("Titolo ricevuto: "+ request.title);
    title=request.title;
  }

  if(request && request.director)
  {
    console.log("Regista ricevuto: "+ request.director);
    director=request.director;
  }



  // fetch all todos from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todos.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};