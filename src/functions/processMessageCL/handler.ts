import { SQSHandler } from 'aws-lambda';
import { RDSService } from '../../utils/rdsServiceCL';
import { EventBridge } from 'aws-sdk';

const eventBridge = new EventBridge();

export const handler: SQSHandler = async (event) => {
  const rdsService = new RDSService();

  for (const record of event.Records) {
    const messageBody = record.body;

    // RDS for Chile appointments
    await rdsService.save();

    // Send scheduling confirmation to EventBridge
    const eventParams = {
      Entries: [
        {
          Source: 'appointment.event',
          DetailType: 'String',
          Detail: JSON.stringify({
            message: messageBody,
            region: 'CL'
          }),
          EventBusName: 'default'
        }
      ]
    };
    await eventBridge.putEvents(eventParams).promise();
    // console.log(
    //   'Scheduling confirmation was sent to EventBridge for CL:',
    //   messageBody
    // );
  }
};
