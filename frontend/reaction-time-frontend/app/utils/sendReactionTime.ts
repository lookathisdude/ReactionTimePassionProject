// lib/reactionTime.ts
import { gql } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";


export type AddReactionTimeResponse = {
  addReactionTime: {
    id: string;
    userId: string;
    reactionTime: number;
    timestamp: string;
  };
};

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

export const ADD_REACTION_TIME = gql`
  mutation AddReactionTime($userId: String!, $reactionTime: Int!) {
    addReactionTime(userId: $userId, reactionTime: $reactionTime) {
      id
      userId
      reactionTime
      timestamp
    }
  }
`;