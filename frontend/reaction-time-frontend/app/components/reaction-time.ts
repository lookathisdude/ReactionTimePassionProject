//This is the code for the reaction time functions


//Calculate the reaction time. It takes the startTime and the endTime as parameters
//  and returns the reaction time in milliseconds.
export function calculateReactionTime(startTime: number, endTime: number): number {
    return endTime - startTime;
}

// Return the average reaction time after four trials.
//Takes an array of reaction times as a parameter and returns the average reaction time in milliseconds.
export function calculateAverageReactionTime(reactionTimes: number[]): number {
  if (reactionTimes.length === 0) return 0; // or null, depending on your use case
  const sum = reactionTimes.reduce((acc, time) => acc + time, 0);
  return sum / reactionTimes.length;
}