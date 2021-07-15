'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();

  const data = JSON.parse(event.body);

  if (typeof data.title !== 'string' || typeof data.duration !== 'number' || typeof data.director !== 'string') {
    console.error('Validation Failed');
    console.error(typeof data.duration);
    callback(null, {
      statusCode: 422,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the film.',
    });
    return;
  }

  const { title, duration, director } = data;

  const params = {
    TableName: process.env.MOVIES_TABLE,
    Item: {
      id: uuid.v1(),
      title,
      director,
      duration,
      watched: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the todo to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the todo item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 201,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
