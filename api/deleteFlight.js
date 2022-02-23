const DB = require("../db/db");

module.exports.handler = async(event) => {
    console.log("delete flight")
    try {
        const db = new DB();
        const data = event.data
        const tableName = "flight-booking-application-table"
        if(!tableName) {
            return {
                "success": false,
                "message": "Failed to delete. Please try again later."
            }
        }

        for(var i = 0; i < data.length;) {
            var params = {RequestItems:{}}
            params.RequestItems[tableName] = [];
            for(var j = 0; j < 25 && i < data.length; i++, j++) {
                params.RequestItems[tableName].push({
                    DeleteRequest: {
                        Key: {
                            "id": {
                                "S": data[i]
                            },
                        }
                    }
                })
            }

            const response = await db.delete(params)
            /* 
                if response.success is false
                    for n times(say 5)
                        use exponential backoff algorithm to retry
            */
        }

        return {
            "success": true,
            "message": "successfully deleted a requested flights"
        }
    } catch(error) {
        console.log(error)
        return {
            "success": false,
            "message": "Sorry, something went wrong. Please try again later."
        }
    }
}