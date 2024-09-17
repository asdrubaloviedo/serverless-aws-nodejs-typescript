import { SQSHandler } from 'aws-lambda';
import { RDSService } from '../../utils/rdsServicePE';
import { EventBridge } from 'aws-sdk';

const eventBridge = new EventBridge();

export const handler: SQSHandler = async (event) => {
  const rdsService = new RDSService();

  for (const record of event.Records) {
    const messageBody = record.body;

    // RDS for Peru appointments
    await rdsService.save();

    // Send scheduling confirmation to EventBridge
    const eventParams = {
      Entries: [
        {
          Source: 'appointment.event',
          DetailType: 'String',
          Detail: JSON.stringify({
            message: messageBody,
            region: 'PE'
          }),
          EventBusName: 'default'
        }
      ]
    };
    await eventBridge.putEvents(eventParams).promise();
    // console.log(
    //   'Scheduling confirmation was sent to EventBridge for PE:',
    //   messageBody
    // );
  }
};
