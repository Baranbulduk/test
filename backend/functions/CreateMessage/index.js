const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  console.log('Event received:', event);

  let parsedBody;

  try {
    parsedBody = JSON.parse(event.body);
  } catch (error) {
    console.error('JSON parse error:', error);
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: JSON.stringify({ error: 'Invalid JSON format.' }),
    };
  }

  const { username, message } = parsedBody;

  if (!username || !message) {
    console.error('Validation error:', { username, message });
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: JSON.stringify({ error: 'Username and message are required.' }),
    };
  }

  const params = {
    TableName: 'Messages',
    Item: {
      id: uuidv4(),
      username: username,
      message: message,
      createdAt: new Date().toISOString()
    }
  };

  try {
    await dynamoDb.put(params).promise();
    console.log('Data inserted successfully');
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: JSON.stringify({ message: 'Message created successfully.' }),
    };
  } catch (error) {
    console.error('Error inserting data:', error);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: JSON.stringify({ error: 'Could not create message.' }),
    };
  }
};