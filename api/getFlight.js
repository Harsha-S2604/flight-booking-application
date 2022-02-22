const { DB } = require("../db/db");

 
module.exports.getFlight = async (event) => {
    const db = new DB();
    const tableName = process.env.FLIGHT_BOOKING_APPLICATION_TABLE
    const response = db.getById(tableName, event);
    if(response["success"]) {
        const item = response["Item"]
        const flight = {
            "id": item.id.S,
            "companyName": item.companyName.S,
            "fromLocation": item.fromLocation.S,
            "toLocation": item.toLocation.S,
            "takeoffTime": item.takeoffTime.S,
            "landingTime": item.landingTime.S,
            "totalSeats": item.totalSeats.N,
            "reservedSeats": item.reservedSeats.N,
        }
        return {
            "success": true,
            "item": flight,
            "message": "",
        }
    }
    
    return {
        "success": false,
        "items": null,
        "message": "Sorry, something went wrong. Please try again later."
    }
};