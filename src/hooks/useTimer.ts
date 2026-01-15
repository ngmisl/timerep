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

  useEffect(() => {
    if (isRunning && currentTime > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev <= 1) {
            setTimeout(() => {
              if (isRestPeriod) {
                // Rest period ended - just exit rest and start next workout
                actions.nextRep();
              } else {
                // Workout ended - check if this is the final rep
                if (currentRep >= repetitions) {
                  // Final rep completed - stop
                  actions.pause();
                  actions.reset();
                } else {
                  // Not final rep - enter rest period
                  actions.enterRestPeriod();
                }
              }
            }, 0);

            if (isRestPeriod) {
              return time;
            } else {
              return currentRep >= repetitions ? 0 : rest;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, currentTime, isRestPeriod, time, rest, currentRep, repetitions, actions]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setCurrentTime(isRestPeriod ? rest : time);
  }, [time, rest, isRestPeriod, resetTrigger]);

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
