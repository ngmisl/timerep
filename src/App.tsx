import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';
import Settings from './components/Settings';
import useTimerStore from './store/timerStore';
import useWakeLock from './hooks/useWakeLock';
import './styles/timer.css';

function App() {
  const { isRestPeriod, repetitions, isRunning } = useTimerStore();

  // Keep screen awake while timer is running
  useWakeLock(isRunning);

  return (
    <div className="app">
      <h1>Timer</h1>
      <TimerDisplay isRestPeriod={isRestPeriod} repetitions={repetitions} />
      <Controls />
      {!isRunning && <Settings />}
      {!isRunning && (
        <footer className="footer">
          <p>
            Made with <span className="heart">♥</span> by{' '}
            <a href="https://meta.orbiter.website" target="_blank" rel="noopener noreferrer">
              meta
            </a>
            {' '}-{' '}
            <a href="https://mtdv.orbiter.website" target="_blank" rel="noopener noreferrer">
              MTDV
            </a>
            {' '}-{' '}
            <a href="https://fourzerofour.fkey.id" target="_blank" rel="noopener noreferrer">
              Support
            </a>
          </p>
        </footer>
      )}
    </div>
  );
}

export default App;
