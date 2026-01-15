import { useEffect, useState, useCallback, useRef } from 'react';
import useTimerStore from '../store/timerStore';

export function useTimer() {
  const {
    time,
    rest,
    repetitions,
    isRunning,
    isRestPeriod,
    currentRep,
    resetTrigger,
    actions,
  } = useTimerStore();

  const [currentTime, setCurrentTime] = useState(() => isRestPeriod ? rest : time);
  const intervalRef = useRef<number | null>(null);

  // Reset time when period changes or settings change
  useEffect(() => {
    setCurrentTime(isRestPeriod ? rest : time);
  }, [isRestPeriod, time, rest, resetTrigger]);

  // Main timer interval
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev === 1) {
            // Timer reached 1 second - handle transition
            if (isRestPeriod) {
              // Rest ended - move to next workout
              if (currentRep < repetitions) {
                actions.nextRep();
              } else {
                // All reps complete
                actions.pause();
                actions.reset();
              }
            } else {
              // Workout ended
              if (currentRep >= repetitions) {
                // This was the final rep - stop
                actions.pause();
                actions.reset();
              } else {
                // More reps to go - enter rest
                actions.enterRestPeriod();
              }
            }
          }
          return prev > 0 ? prev - 1 : 0;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isRestPeriod, currentRep, repetitions, actions]);

  const isWarning = useCallback(() => {
    return currentTime <= 5 && currentTime > 0;
  }, [currentTime]);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    actions.reset();
  }, [actions]);

  return {
    currentTime,
    currentRep,
    isWarning,
    start: actions.start,
    pause: actions.pause,
    resume: actions.resume,
    reset,
    setTime: actions.setTime,
    setRest: actions.setRest,
    setRepetitions: actions.setRepetitions,
  };
}

export default useTimer;
