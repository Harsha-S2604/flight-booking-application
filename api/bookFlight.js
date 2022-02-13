const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB()

module.exports.handler = async (event) => {
    const id = event.arguments.id
    const noOfSeats = event.arguments.noOfSeats.toString();
    const params = {        
        ExpressionAttributeNames: {
            "#ts": "totalSeats",
            "#rs": "reservedSeats"          
        },
        ExpressionAttributeValues: {
            ":ns": {
                N: noOfSeats 
            }
        },
        Key: {
            "id": {
                S: id
            }
        },
        ReturnValues: "ALL_NEW",
        TableName: process.env.FLIGHT_BOOKING_APPLICATION_TABLE,
        UpdateExpression: "SET #ts = #ts - :ns, #rs = #rs + :ns"
    }

    return dynamodb.updateItem(params).promise()
      .then(data => {
          const body = data.Attributes
          const dataToSend = {
            id: body.id.S,
            companyName: body.companyName.S,
            fromLocation: body.fromLocation.S,
            toLocation: body.toLocation.S,
            takeoffTime: body.takeoffTime.S,
            landingTime: body.landingTime.S,
            noOfSeats: noOfSeats
          } 
          return {
            "statusCode": 200,
            "data": dataToSend,
          }
      })
      .catch(err => {
        return {
            "statusCode": 500,
            "data": {},
            "message": "Sorry, Something went wrong. Please try again later."
          }
      })
};