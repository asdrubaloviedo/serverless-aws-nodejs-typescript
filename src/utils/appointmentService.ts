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

export const updateAppointment = async (body) => {
  const dynamodb = connect();

  const params = {
    TableName: appointmentTable4,
    Key: { pk: body.pk },
    UpdateExpression: 'set #state = :state',
    ExpressionAttributeNames: { '#state': 'state' },
    ExpressionAttributeValues: { ':state': body.state },
    ReturnValues: 'ALL_NEW'
  };
  return await dynamodb.update(params).promise();
};

export const snsMessage = async (body) => {
  const targetQueue = body.countryISO === 'PE' ? 'queue1' : 'queue2';
  const targetTopic =
    body.countryISO === 'PE'
      ? process.env.SNS_TOPIC_ARN_PE
      : process.env.SNS_TOPIC_ARN_CL;
  try {
    const params = {
      Message: JSON.stringify(body),
      TopicArn: targetTopic,
      MessageAttributes: {
        targetQueue: {
          DataType: 'String',
          StringValue: targetQueue
        }
      }
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
