import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerId, setTimerId] = useState(0);

  useEffect(() => {
    if (isRunning) {
      const id = window.setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000); // Update every second
      setTimerId(id);
    } else {
      window.clearInterval(timerId);
    }
    return () => window.clearInterval(timerId); // Clean up on component unmount
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  return (
    <div>
      <h2>Stopwatch</h2>
      <div>Time: {elapsedTime} seconds</div>
      <button onClick={handleStartStop}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={handleReset} disabled={isRunning}>Reset</button>
    </div>
  );
};

export default Stopwatch;
