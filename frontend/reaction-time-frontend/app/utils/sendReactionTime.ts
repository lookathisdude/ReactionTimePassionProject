// This util will be responsible for sending the reaction time data to the backend server.
// It uses the fetch API to make a POST request to the server with the reaction time data in JSON format.
// The util also handles the response from the server and logs any errors that may occur during the request.
// version 1.0.3
// Updated to always send reaction time as an integer (rounded milliseconds).

import { v4 as uuidv4 } from "uuid";

// Get the user id and generate a UUID if it doesn't exist
export function getUserId(): string {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem("userId", userId);
    console.log("Generated new userId:", userId);
  }
  return userId;
}

// Send reaction time to backend (rounded to nearest integer)
export async function sendReactionTime(userId: string, reactionTime: number) {
  const GRAPHQL_URL =
    process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:8080/graphql";

  // Round reaction time to nearest integer
  const roundedReactionTime = Math.round(reactionTime);

  const mutation = `
    mutation AddReactionTime($userId: String!, $reactionTime: Int!) {
      addReactionTime(userId: $userId, reactionTime: $reactionTime) {
        id
        userId
        reactionTime
        timestamp
      }
    }
  `;

  try {
    // Make the POST request to the backend
    const response = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: mutation,
        variables: { userId, reactionTime: roundedReactionTime }, // Pass rounded integer
      }),
    });

    const data = await response.json();
    console.log("Full response from server:", data);

    // Check if the response contains the expected property
    if (data?.data?.addReactionTime) {
      return data.data.addReactionTime;
    } else if (data?.errors) {
      console.error("GraphQL errors:", data.errors);
      throw new Error("GraphQL returned errors");
    } else {
      console.error("Unexpected response:", data);
      throw new Error("Failed to send reaction time data to server");
    }
  } catch (error) {
    console.error("Error sending data to server:", error);
  }
}