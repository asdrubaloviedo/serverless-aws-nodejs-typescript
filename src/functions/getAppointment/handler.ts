import { formatJSONResponse } from '../../libs/api-gateway';

export const handler = (event: any) => {
  console.log('Test getAppointment function');
  return {
    message: 'The appointment has been read successfully',
    input: event
  };
};
