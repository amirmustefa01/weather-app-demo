import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB Client
const client = new DynamoDBClient({ region: "us-east-1" }); // Change to your region
const docClient = DynamoDBDocumentClient.from(client); // Converts to Document Client

export const getEvent = async (event) => {
  const params = {
    TableName: "weather-app-event",
    Key: {
      ["eventId"]: "123456", // Key lookup
    },
  };
  try {
    const data = await docClient.send(new GetCommand(params));
    if(data) {
      console.log("Success", data.Item);
      return {
        statusCode: 200,
        body: JSON.stringify({
          data: data.Item,
          message: "Go Serverless v4! Your function executed successfully!",
        }),
      };
    }
  } catch(e) {
    console.log("Early error", e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e, message: "Error retrieving data" }),
    };
  }
};

export const changeDay = async (event) => {
  const reqData = JSON.parse(event?.body)
  console.log("event: ", reqData?.data?.newDayIndex)
  const params = {
    TableName: "weather-app-event",
    Key: {
      ["eventId"]: "123456", // Key lookup
    },
    UpdateExpression: "set #key = :value", // Update expression
    ExpressionAttributeNames: {
      "#key": "dayIndex", // Field name to update
    },
    ExpressionAttributeValues: {
      ":value": reqData?.data?.newDayIndex, // New value to update
    },
    ReturnValues: "ALL_NEW", // Return the updated item
  };
  try {
    const data = await docClient.send(new UpdateCommand(params));
    if(data) {
      console.log("Success", data.Item);
      return {
        statusCode: 200,
        body: JSON.stringify({
          data: data.Item,
          message: "Go Serverless v4! Your function executed successfully!",
        }),
      };
    }
  } catch(e) {
    console.log("Early error", e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e, message: "Error retrieving data" }),
    };
  }
};
