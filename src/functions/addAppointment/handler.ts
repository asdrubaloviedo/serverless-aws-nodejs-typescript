import { formatJSONResponse } from '../../libs/api-gateway';
import {
  createAppointment,
  updateAppointment,
  snsMessage
} from '../../utils/appointmentService';
import * as crypto from 'crypto';

export const handler = async (event: any) => {
  // Verificamos si el evento viene de SQS o HTTP
  if (event.Records) {
    // console.log('UpdateAppointment function');

    // Procesar mensajes de SQS
    for (const record of event.Records) {
      const message = JSON.parse(record.body);

      const { Message } = JSON.parse(message.detail.message);
      const body = {
        ...JSON.parse(Message),
        state: 'completed'
      };
      const res = await updateAppointment(body);
      if (!res)
        return formatJSONResponse({
          message: `There was an error updating the table appointmentTable4`,
          status: 403
        });

      return formatJSONResponse({
        message: body,
        status: 200
      });
    }
  } else {
    // console.log('AddAppointment function');

    const pk = crypto.randomBytes(20).toString('hex');
    const body = JSON.parse(event.body);
    body.pk = pk;
    body.state = 'pending';
    const res = await createAppointment(body);
    if (!res)
      return formatJSONResponse({
        message: `There was an error inserting in table appointmentTable4`,
        status: 403
      });

    const snsResult = await snsMessage({ ...body, pk });

    return formatJSONResponse({
      snsResult: snsResult,
      message: body,
      status: 200
    });
  }
};
