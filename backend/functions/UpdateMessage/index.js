const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const requestBody = JSON.parse(event.body);
    const { id } = event.pathParameters;
    const { message } = requestBody;

    const params = {
        TableName: 'Messages',
        Key: {
            id: id
        },
        UpdateExpression: 'set message = :message',
        ExpressionAttributeValues: {
            ':message': message
        },
        ReturnValues: 'UPDATED_NEW'
    };

    try {
        const data = await dynamoDb.update(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(data.Attributes)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not update message' })
        };
    }
};