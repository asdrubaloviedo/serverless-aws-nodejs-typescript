import { formatJSONResponse } from '../../libs/api-gateway';
import { createAppointment, snsMessage } from '../../utils/appointmentService';
import * as crypto from 'crypto';

export const handler = async (event: any) => {
  console.log('Test addAppointment function');
  console.log('Event: ', event);

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

  const snsResult = await snsMessage(body);

  return formatJSONResponse({
    snsResult: snsResult,
    message: body,
    status: 200
  });
};
