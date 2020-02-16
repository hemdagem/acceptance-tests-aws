import { SNS, config, DynamoDB } from 'aws-sdk'

config.update({ region: 'eu-west-1' });

test('Publish Sns topic', async () => {

  var params = {
    Message: 'Test Message',
    TopicArn: ''
  };


  let sns = new SNS();
  await sns.publish(params).promise();

  var dynamoParams = {
    RequestItems: {
      "Test": {
        Keys: [
          {
            "Test": {
              S: "Hello"
            }
          }],
      }
    }
  };

  let dynamo = new DynamoDB();
  let response = await dynamo.batchGetItem(dynamoParams).promise();

  console.log(response.Responses.Test);
});