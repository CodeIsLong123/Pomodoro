import React, { useState, useEffect } from 'react';

const TimerDisplay = ({ timeLeft, onTimeChange }) => {
  const handleChange = (e, unit) => {
    const value = parseInt(e.target.value) || 0;
    onTimeChange({ ...timeLeft, [unit]: value });
  };

  return (
    <div className="timer-display">
      <div className="timer-unit">
        <input
          type="number"
          value={timeLeft.hours.toString().padStart(2, '0')}
          onChange={(e) => handleChange(e, 'hours')}
          min="0" max="23"
        />
        <span className="timer-label">Hours</span>
      </div>
      <span className="timer-separator">:</span>
      <div className="timer-unit">
        <input
          type="number"
          value={timeLeft.minutes.toString().padStart(2, '0')}
          onChange={(e) => handleChange(e, 'minutes')}
          min="0" max="59"
        />
        <span className="timer-label">Mins</span>
      </div>
      <span className="timer-separator">:</span>
      <div className="timer-unit">
        <input
          type="number"
          value={timeLeft.seconds.toString().padStart(2, '0')}
          onChange={(e) => handleChange(e, 'seconds')}
          min="0" max="59"
        />
        <span className="timer-label">Seconds</span>
      </div>
    </div>
  );
};

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 25, seconds: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
            clearInterval(interval);
            setIsActive(false);
            return isBreak ? { hours: 0, minutes: 25, seconds: 0 } : { hours: 0, minutes: 5, seconds: 0 };
          } else if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          } else {
            return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, isBreak]);

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setTimeLeft({ hours: 0, minutes: 25, seconds: 0 });
    setIsActive(false);
    setIsBreak(false);
  };

  const handleBreak = () => {
    setTimeLeft({ hours: 0, minutes: 5, seconds: 0 });
    setIsBreak(true);
    setIsActive(true);
  };

  return (
    <div className="pomodoro-timer">
      <h1>Pomodoro Timer</h1>
      <TimerDisplay timeLeft={timeLeft} onTimeChange={setTimeLeft} />
      <div className="timer-controls">
        <button className="timer-button" onClick={handleStartPause}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="timer-button" onClick={handleReset}>Reset</button>
        <button className="timer-button" onClick={handleBreak}>Take a Break</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;