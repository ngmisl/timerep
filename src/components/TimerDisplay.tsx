import useTimer from '../hooks/useTimer';
import useTimerStore from '../store/timerStore';

interface TimerDisplayProps {
  isRestPeriod: boolean;
  repetitions: number;
}

export default function TimerDisplay({ isRestPeriod, repetitions }: TimerDisplayProps) {
  const { currentTime, currentRep, isWarning } = useTimer();
  const { isRunning } = useTimerStore();

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPeriodClass = () => {
    if (!isRunning) return '';
    return isRestPeriod ? 'rest' : 'workout';
  };

  return (
    <div className={`timer-display ${isWarning() ? 'warning' : ''} ${isRunning ? 'fullscreen' : ''} ${getPeriodClass()}`}>
      <h1 className="timer-time">{formatTime(currentTime)}</h1>
      <p className="timer-label">
        {isRestPeriod ? 'Rest' : 'Workout'} • Rep {currentRep} of {repetitions}
      </p>
    </div>
  );
}
