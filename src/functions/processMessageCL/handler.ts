import { SQSHandler } from 'aws-lambda';
import { RDSService } from '../../utils/rdsServicePE';

export const handler: SQSHandler = async (event) => {
  const rdsService = new RDSService();

  for (const record of event.Records) {
    const messageBody = record.body;
    console.log('Processing message CL:', messageBody);

    // RDS for Peru appointments
    await rdsService.save();
  }
};
