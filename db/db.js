import {Flight} from '../models/flight';
const AWS = require('aws-sdk')

export class DB {
    constructor() {
        this.dynamodb = new AWS.DynamoDB();
        AWS.config.update({
            region: "local",
            endpoint: "http://localhost:8000"
        });
    }

    getAll = async (tableName, event) => {
        const lastExecutedKey = event.arguments.page
        const params = {
            TableName: tableName,
            Limit: limit,
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
            TableName: this.tableName,
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

}