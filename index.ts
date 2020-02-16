import { SNS, config } from 'aws-sdk'

config.update({ region: 'eu-west-1' });


test('Publish Sns topic', async () => {

  var params = {
    Message: 'Test Message',
    TopicArn: ''
  };


  let sns = new SNS({ apiVersion: '2010-03-31' });
  var response = await sns.publish(params).promise();
  console.log(response);
});