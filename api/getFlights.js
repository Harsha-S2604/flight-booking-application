const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB()

module.exports.handler = async (event) => {
    const params = {        
        TableName: process.env.FLIGHT_BOOKING_APPLICATION_TABLE
    }

    return dynamodb.scan(params).promise()
        .then(data => {            
            const flights = [];
            for (let i = 0; i < data.Items.length; i++) {
                flights.push({
                    id: data.Items[i].id.S,
                    companyName: data.Items[i].companyName.S,
                    fromLocation: data.Items[i].fromLocation.S,
                    toLocation: data.Items[i].toLocation.S,
                    takeoffTime: data.Items[i].takeoffTime.S,
                    landingTime: data.Items[i].landingTime.S,
                    totalSeats: data.Items[i].totalSeats.N,
                    reservedSeats: data.Items[i].reservedSeats.N,
                });        
            }
            
            return flights
        })
        .catch(err => {
            console.log(err)
        })
};