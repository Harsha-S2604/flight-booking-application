const AWS = require('aws-sdk')

class DB {
    constructor() {
        AWS.config.update({
            region: "local",
            endpoint: "http://localhost:8000"
        });
        this.dynamodb = new AWS.DynamoDB();
    }

    getAll = async (tableName, event) => {
        const lastExecutedKey = undefined
        const params = {
            TableName: tableName,
            Limit: 50,
        }

        if(lastExecutedKey) {
            params["ExclusiveStartKey"] = {
                "id": {
                    "S": lastExecutedKey
                }
            }
        }

        return this.dynamodb.scan(params).promise()
            .then(data => {
                return {
                    "data": data,
                    "success": true,
                }
            }).catch(err => {
                console.log(err)
                return {
                    "data": null,
                    "success": false,
                }
            })
    }

    book = async (tableName, event) => {
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
            TableName: tableName,
            UpdateExpression: "SET #ts = #ts - :ns, #rs = #rs + :ns"
        }

        return this.dynamodb.updateItem(params).promise()
            .then(data => {
                return {
                    "data": data,
                    "success": true
                }
            })
            .catch(err => {
                
                return {
                    "data": null,
                    "success": false,
                }
            })
    }

    getById = async(tableName, event) => {
        const id = event.arguments.id
        const params = {
            TableName: tableName,
            Key: {
                "id": {
                    S: id
                }
            }
        }

        return this.dynamodb.getItem(params).promise()
                .then(data => {
                    return {
                        "data": data,
                        "success": true,
                    }
                })
                .catch(err => {
                    return {
                        "data": null,
                        "success": false,
                    }
                })
    }

    create = async (params) => {
        await this.dynamodb.batchWriteItem(params).promise()
                .then(response => {
                    console.log("success")
                    return {
                        "success": true
                    }
                })
                .catch(err => {
                    console.log(err)
                    return {
                        "success": false
                    }
                })
    }

    delete = async(params) => {
        await this.dynamodb.batchWriteItem(params).promise()
                .then(response => {
                    console.log("success")
                    return {
                        "success": true
                    }
                })
                .catch(err => {
                    console.log(err)
                    return {
                        "success": false
                    }
                })
    }

}

module.exports = DB;