const dynamoDb = require('../../config/dynamoDbConfig');

exports.handler = async (event) => {
    const params = {
        TableName: 'Messages'
    };

    try {
        const data = await dynamoDb.scan(params).promise();
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET"
            },
            body: JSON.stringify(data.Items)
        };
    } catch (error) {
        console.error(error); // Lägg till denna rad för att logga felet
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET"
            },
            body: JSON.stringify({ error: 'Could not retrieve messages' })
        };
    }
};