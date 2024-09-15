import { formatJSONResponse } from '../../libs/api-gateway';

export const handler = (event: any) => {
  console.log('Test agregarCita function');
  console.log('Event: ', event);
  return {
    message: 'Se ha agregado la cita',
    input: event
  };
};
