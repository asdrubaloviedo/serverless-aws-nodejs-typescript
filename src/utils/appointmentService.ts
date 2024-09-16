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

export const snsMessage = async (body) => {
  const targetQueue = body.countryISO === 'PE' ? 'queue1' : 'queue2';
  const targetTopic =
    body.countryISO === 'PE'
      ? process.env.SNS_TOPIC_ARN_PE
      : process.env.SNS_TOPIC_ARN_CL;
  console.log('targetTopic: ', targetTopic);
  try {
    const params = {
      Message: 'Hello SNS i am the addAppointment Lambda!',
      TopicArn: targetTopic,
      MessageAttributes: {
        targetQueue: {
          DataType: 'String',
          StringValue: targetQueue
        }
      }
    };

    console.log('Publishing to SNS:', params);
    const result = await sns.publish(params).promise();
    console.log('SNS publish result:', result);

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
