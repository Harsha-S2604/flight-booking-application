const dynamoose = require('dynamoose');

const schema = new dynamoose.Schema(
    {
        id: {
            type: String,
            hashKey: true,
        },
        companyName: {
            type: String,
            required: true,
        },
        fromLocation: {
            type: String,
            required: true,
        },
        toLocation: {
            type: String,
            required: true,
        },
        takeoffTime: {
            type: String,
            required: true,
        },
        landingTime: {
            type: String,
            required: true,
        },
        totalSeats: {
            type: Number,
            required: true,
        },
        reservedSeats: {
            type: Number,
            required: true,
        },
    },
);

const FlightsModel = dynamoose.model('flightstable', schema, {
    create: true,
})

module.exports = { FlightsModel };
  