import * as aws from 'aws-sdk';
const appointmentTable4 = 'appointmentTable4';
const sns = new aws.SNS({ region: 'us-east-1' });

let dynamoDbClient = null;

const connect = () => {
  if (!dynamoDbClient) {
    const config = {
      convertEmptyValues: true
    };
    dynamoDbClient = new aws.DynamoDB.DocumentClient(config);
  }
  return dynamoDbClient;
};

export const createAppointment = async (body) => {
  const dynamodb = connect();
  var params = {
    TableName: appointmentTable4,
    Item: body
  };
  return await dynamodb.put(params).promise();
};

export const snsMessage = async () => {
  try {
    const params = {
      Message: 'Hello SNS i am the addAppointment Lambda!',
      TopicArn: process.env.SNS_TOPIC_ARN
    };

    const result = await sns.publish(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Message sent to SNS',
        result
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to send message to SNS',
        error: error.message
      })
    };
  }
};
