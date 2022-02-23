const DB = require("../db/db");

 
module.exports.handler = async (event) => {
    try {
        const data = event.data
        const db = new DB();
        const tableName = "flight-booking-application-table"
        if(!tableName) {
            return {
                "success": false,
                "item": null,
                "message": "Sorry, something went wrong. Please try again later."
            }
        }
        /*
            data : {
                [
                    {   
                        "id": "F01", 
                        "companyName": "air india", 
                        "fromLocation": "bangalore", 
                        "toLocation": "chennai", 
                        "takeoffTime": "12:30pm", 
                        "landingTime": "4:00pm",
                        "totalSeats": 105,
                        "reservedSeats": 0    
                    },
                    {   
                        "id": "F02", 
                        "companyName": "air india", 
                        "fromLocation": "bangalore", 
                        "toLocation": "hyderabad", 
                        "takeoffTime": "09:00am", 
                        "landingTime": "02:00pm",
                        "totalSeats": 105,
                        "reservedSeats": 0    
                    },
                    {   
                        "id": "F03", 
                        "companyName": "air india", 
                        "fromLocation": "pune", 
                        "toLocation": "delhi", 
                        "takeoffTime": "01:30pm", 
                        "landingTime": "05:00pm",
                        "totalSeats": 105,
                        "reservedSeats": 0    
                    }
                ]
            }
        */
        for(var i = 0; i < data.length;) {
            var params = {RequestItems:{}}
            params.RequestItems[tableName] = [];
            for(var j = 0; j < 25 && i < data.length; i++, j++) {
                params.RequestItems[tableName].push({
                    PutRequest: {
                        Item: {
                            "id": {
                                "S": data[i]['id']
                            },
                            "companyName": {
                                "S": data[i]["companyName"]
                            },
                            "fromLocation": {
                                "S": data[i]["fromLocation"]
                            },
                            "toLocation": {
                                "S": data[i]["toLocation"]
                            },
                            "takeoffTime": {
                                "S": data[i]["takeoffTime"]
                            },
                            "landingTime": {
                                "S": data[i]["landingTime"]
                            },
                            "totalSeats": {
                                "N": data[i]["totalSeats"]
                            },
                            "reservedSeats": {
                                "N": data[i]["reservedSeats"]
                            }
                        }
                    }
                })
            }
            const response = await db.create(params)
            /* if response["success"] is false
                    for n times
                        use exponential backoff algorithm to retry */
            
        }

        return {
            "success": true,
            "message": "successfully registered a flights"
        }
    } catch(error) {
        return {
            "success": false,
            "message": "Sorry somethinf went wrong. Please try again later."
        }
    }
};