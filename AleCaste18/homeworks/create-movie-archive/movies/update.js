'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {

  const timestamp = new Date().getTime();

  const data = JSON.parse(event.body);

  // validation

  let validationPass = true;

  if ((typeof data.title !== 'undefined' && typeof data.title !== 'string') 
  || (typeof data.duration !== 'undefined' && typeof data.duration !== 'number') 
  || (typeof data.director !== 'undefined' && typeof data.director !== 'string'))
  {
    validationPass = false;
  }

  if (typeof data.watched != 'boolean') {
    validationPass = false;
  }

  if (!validationPass) {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t update the film item.',
    });
    return;
  }

  let titlePassed = false;
  if (typeof data.title == 'string') {
    titlePassed = true;
  }

  let durationPassed = false;
  if (typeof data.duration == 'number') {
    durationPassed = true;
  }

  let directorPassed = false;
  if (typeof data.director == 'string') {
    directorPassed = true;
  }

  const params = {
    TableName: process.env.MOVIES_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: {},
    ExpressionAttributeValues: {
      ':watched': data.watched,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET watched = :watched, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  if (titlePassed) {
    params.ExpressionAttributeValues[':title'] = data.title;
    params.ExpressionAttributeNames['#movie_title'] = 'title';
    params.UpdateExpression += ' , #movie_title = :title'
  }

  if (durationPassed) {
    params.ExpressionAttributeValues[':duration'] = data.duration;
    params.ExpressionAttributeNames['#movie_duration'] = 'duration';
    params.UpdateExpression += ' , #movie_duration = :duration'
  }

  if (directorPassed) {
    params.ExpressionAttributeValues[':director'] = data.director;
    params.ExpressionAttributeNames['#movie_director'] = 'director';
    params.UpdateExpression += ' , #movie_director = :director'
  }

  console.log(params);

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
