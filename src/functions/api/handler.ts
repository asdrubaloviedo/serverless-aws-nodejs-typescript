import { formatJSONResponse } from '@libs/api-gateway';

export const handler = (event: any) => {
  return formatJSONResponse({
    message: 'Go Serverless v3.0! Your function executed successfully!',
    input: event
  });
};
