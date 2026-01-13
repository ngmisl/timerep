import useTimer from '../hooks/useTimer';
import useTimerStore from '../store/timerStore';

export default function Controls() {
  const { start, pause, reset } = useTimer();
  const { isRunning } = useTimerStore();

  const handleStartPause = () => {
    if (isRunning) {
      pause();
    } else {
      start();
    }
  };

  return (
    <div className={`controls ${isRunning ? 'fullscreen' : ''}`}>
      <button className="btn btn-primary" onClick={handleStartPause}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button className="btn btn-secondary" onClick={reset}>
        Reset
      </button>
    </div>
  );
}
