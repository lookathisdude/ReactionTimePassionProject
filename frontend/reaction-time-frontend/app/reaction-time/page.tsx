"use client";

import { useState } from "react";
import {
  calculateReactionTime,
  calculateAverageReactionTime,
} from "../utils/reaction-time";
import { getUserId, sendReactionTime } from "../utils/sendReactionTime";

export default function ReactionTest() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [waiting, setWaiting] = useState(false);
  const [message, setMessage] = useState("Click Start!");
  const [count, setCount] = useState(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);

  const totalTrials = 4;

  const handleStart = () => {
    setMessage("Wait for it...");
    setWaiting(true);

    const delay = Math.random() * 2000 + 1000;
    setTimeout(() => {
      setStartTime(Date.now());
      setMessage("Click NOW!");
    }, delay);
  };

  const handleClick = async () => {
    if (!waiting) {
      setMessage('Press "Start" first!');
      return;
    }
    if (startTime === null) {
      setMessage("Too early! Try again.");
      setWaiting(false);
      return;
    }

    const reaction = calculateReactionTime(startTime, Date.now());
    setMessage(`Your reaction time: ${reaction} ms`);
    setWaiting(false);
    setStartTime(null);

    const newCount = count + 1;
    setCount(newCount);
    const updatedReactionTimes = [...reactionTimes, reaction];
    setReactionTimes(updatedReactionTimes);

    // Send reaction time to backend
    try {
      const userId = getUserId();
      const result = await sendReactionTime(userId, reaction);
      console.log("Sent reaction time to backend:", result);
    } catch (error) {
      console.error("Failed to send reaction time:", error);
    }

    //Check if the test is complete and calculate average reaction time
    if (newCount === totalTrials) {
      const average = calculateAverageReactionTime(updatedReactionTimes);
      setMessage(`Test complete! Your average reaction time: ${average} ms`);
      setCount(0);
      setReactionTimes([]);
    }
  };

  return (
    <div>
      <h1>Reaction Time Test</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleClick}>Click!</button>
      <p>{message}</p>
    </div>
  );
}
