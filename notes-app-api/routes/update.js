import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'notes',
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      notesId: event.pathParameters.id,
    },
    UpdateExpression:
      'SET content = :content, attachment = :attachment, title = :title',
    ExpressionAttributeValues: {
      ':attachment': data.attachment || null,
      ':content': data.content || null,
      ':title': data.title || null,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDbLib.call('update', params);
    return success({ status: true });
  } catch (e) {
    return failure({ status: false });
  }
}
