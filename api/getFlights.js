const DB  = require("../db/db");

 
module.exports.handler = async (event) => {
    const db = new DB();
    const tableName = "flight-booking-application-table"
    const response = await db.getAll(tableName, event);
    // console.log("RESPONSE", response)
    let flights = [];
    if(response.success) {
        for(let i = 0; i < response.data.Items.length; i++) {
            flights.push({
                id: response.data.Items[i].id.S,
                companyName: response.data.Items[i].companyName.S,
                fromLocation: response.data.Items[i].fromLocation.S,
                toLocation: response.data.Items[i].toLocation.S,
                takeoffTime: response.data.Items[i].takeoffTime.S,
                landingTime: response.data.Items[i].landingTime.S,
                totalSeats: response.data.Items[i].totalSeats.N,
                reservedSeats: response.data.Items[i].reservedSeats.N,
            })
        }
        let lastExecutedKey = undefined
        if(response.data.LastEvaluatedKey) {
            lastExecutedKey = response.data.LastEvaluatedKey.id.S
        }

        return {
            "success": true,
            "lastExecutedKey": lastExecutedKey,
            "items": flights,
            "message": "",
        }
    }
    
    return {
        "success": false,
        // "lastExecutedKey": response["data"].LastEvaluatedKey.id["S"],
        "items": [],
        "message": "Sorry, something went wrong. Please try again later."
    }
};