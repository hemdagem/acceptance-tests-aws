import { SNS, config, DynamoDB } from 'aws-sdk'
import { ItemList } from 'aws-sdk/clients/dynamodb';

config.update({ region: 'eu-west-1' });

function getDynamoItem(tableName: string, key: string, item: string) {
  var promise = new Promise<ItemList>(function (resolve, reject) {
    window.setTimeout(async function () {
      var dynamoParams = {
        RequestItems: {
          [tableName]: {
            Keys: [
              {
                [key]: {
                  S: item
                }
              }],
          }
        }
      };
      let dynamo = new DynamoDB();
      let response = await dynamo.batchGetItem(dynamoParams).promise();

      resolve(response.Responses.Test);
    }, 3000);
  });
  return promise;
}

test('Publish sns message and expect message to reach dynamo ', async () => {

  let sns = new SNS();
  let topics = await sns.listTopics().promise();
  let topic = topics.Topics.find(p => p.TopicArn.indexOf(":Test") > -1);

  var params = {
    Message: 'Dev',
    TopicArn: topic.TopicArn
  };
  await sns.publish(params).promise();
  var dynamoCheck = await getDynamoItem("Test", "Test", params.Message);

  expect(dynamoCheck[0].Test.S).toBe(params.Message);

});