"use client";

//Version 1.0.0
// Started on the logic for the reaction time test. This includes calculating the reaction time and the average reaction time after four trials.
//TODO: Add ui for the reaction time test and display the reaction time and average reaction time to the user. Also, add a button to start the test and a button to click when the user is ready to test their reaction time. Finally, add a message to display the reaction time and average reaction time to the user.

import { useState } from "react";
import {
  calculateReactionTime,
  calculateAverageReactionTime,
} from "../components/reaction-time";

export default function ReactionTest() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [waiting, setWaiting] = useState(false);
  const [message, setMessage] = useState("Click Start!");
  // Count how many times the user has taken the test.
  // This is used to calculate the average reaction time after four trials.
  const [count, setCount] = useState(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);

  const totalTrials = 4;

  const handleStart = () => {
    setMessage("Wait for it...");
    setWaiting(true);

    const delay = Math.random() * 2000 + 1000; // 1–3 seconds
    setTimeout(() => {
      setStartTime(Date.now());
      setMessage("Click NOW!");
      //Display the reaction time then add it to the reactionTimes array. This is used to calculate the average reaction time after four trials.
      if (startTime !== null) {
        const reaction = calculateReactionTime(startTime, Date.now());
        setMessage(`Your reaction time: ${reaction} ms`);
        setReactionTimes([...reactionTimes, reaction]);
      }
    }, delay);
  };

  const handleClick = () => {
    if (!waiting) {
      setMessage('Press "Start" first!');
      return;
    }

    if (startTime === null) {
      // Clicked too early
      setMessage("Too early! Try again.");
      setWaiting(false);
      return;
    }

    // Valid click
    const reaction = calculateReactionTime(startTime, Date.now());
    setMessage(`Your reaction time: ${reaction} ms`);
    setWaiting(false);
    setStartTime(null);
    setCount(count + 1);

    // If the increment equals the total trials, calculate the average reaction time and reset the count and reaction times.
    if (count + 1 === totalTrials) {
      const average = calculateAverageReactionTime([
        ...reactionTimes,
        reaction,
      ]);
      //Display the average reaction time to the user and
      // reset the count and reaction times. Rounded to two decimal places.
      setMessage(`Your average reaction time: ${average.toFixed(2)} ms`);
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
