const { DB } = require("../db/db");

 
module.exports.getAllFlights = async (event) => {
    const db = new DB();
    const response = db.getAll(process.env.FLIGHT_BOOKING_APPLICATION_TABLE, event);
    if(response["success"]) {
        const flights = [];
        for(let i = 0; i < response["data"].Items.length; i++) {
            flights.push({
                id: data.Items[i].id.S,
                companyName: data.Items[i].companyName.S,
                fromLocation: data.Items[i].fromLocation.S,
                toLocation: data.Items[i].toLocation.S,
                takeoffTime: data.Items[i].takeoffTime.S,
                landingTime: data.Items[i].landingTime.S,
                totalSeats: data.Items[i].totalSeats.N,
                reservedSeats: data.Items[i].reservedSeats.N,
            })
        }

        return {
            "success": true,
            "lastExecutedKey": data.LastEvaluatedKey.id["S"],
            "items": flights,
            "message": "",
        }
    }
    
    return {
        "success": false,
        "lastExecutedKey": data.LastEvaluatedKey.id["S"],
        "items": flights,
        "message": "Sorry, something went wrong. Please try again later."
    }
};