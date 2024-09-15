import { formatJSONResponse } from '../../libs/api-gateway';

export const handler = (event: any) => {
  console.log('Test obtenerPersona function');
  return {
    message: 'Go Serverless v3.0! Your function executed successfully!',
    input: event
  };
};
