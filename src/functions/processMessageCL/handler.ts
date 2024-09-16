import { SQSHandler } from 'aws-lambda';

export const handler: SQSHandler = async (event) => {
  for (const record of event.Records) {
    const messageBody = record.body;
    console.log('Processing message CL:', messageBody);
  }
};
