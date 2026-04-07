// This util will be responsible for calculating the reaction time for each trial.
// Version 1.1.2

export function calculateReactionTime(startTime: number, endTime: number): number {
  return endTime - startTime;
}

export function calculateAverageReactionTime(reactionTimes: number[]): number {
  const total = reactionTimes.reduce((sum, time) => sum + time, 0);
  return Math.round(total / reactionTimes.length);
}