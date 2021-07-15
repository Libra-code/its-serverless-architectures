'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.name !== 'string' || typeof data.email !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t update the contact item.',
    });
    return;
  }

  const params = {
    TableName: process.env.DYN_T_CONTACTS,
    Key: {
      id: event.pathParameters.id,
    },
    ExpressionAttributeNames: {
      '#contact_name': 'name',
      '#contact_email': 'email',
    },
    ExpressionAttributeValues: {
      ':name': data.name,
      ':email': data.email,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET #contact_name = :name, #contact_email = :email, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

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
