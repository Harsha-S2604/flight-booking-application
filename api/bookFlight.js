const { DB } = require('../db/db');

module.exports.bookFlight = async (event) => {
    const db = new DB();
    const tableName = process.env.FLIGHT_BOOKING_APPLICATION_TABLE;
    const response = db.book(tableName, event);
    if(response["success"]) {
        return {
            "success": true,
            "message": "Ticket booked successfully."
        }    
    }
    
    return {
        "success": false,
        "message": "Failed to book ticket. Please try again later."
    }
};