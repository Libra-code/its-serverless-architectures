'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const {create : contactsCreate} = require('./create');
const {list : contactsList} = require('./list');
const {get : contactsGet} = require('./get');
const {update: contactsUpdate} = require('./update');
const {delete : contactsDelete} = require('./delete');
const dynamoDb = new AWS.DynamoDB.DocumentClient();




module.exports.contactshandler = (event, context, callback) => {
    switch (event.httpMethod) {
        case "POST":
            return contactsCreate(event, context, callback);            
        case "GET":
            if (event.pathParameters && event.pathParameters.id) {
                return contactsGet(event, context, callback); 
            }            
            return contactsList(event, context, callback);            
        case "PUT":
            return contactsUpdate(event, context, callback);        
        case "DELETE":
            return contactsDelete(event, context, callback);
    }
    
};