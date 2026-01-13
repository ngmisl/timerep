import { useState, useEffect } from 'react';
import useTimerStore from '../store/timerStore';
import { timerSettingsSchema } from '../validation/schemas';

export default function Settings() {
  const { time, rest, repetitions, actions } = useTimerStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [localTime, setLocalTime] = useState(time.toString());
  const [localRest, setLocalRest] = useState(rest.toString());
  const [localRepetitions, setLocalRepetitions] = useState(repetitions.toString());

  useEffect(() => {
    setLocalTime(time.toString());
  }, [time]);

  useEffect(() => {
    setLocalRest(rest.toString());
  }, [rest]);

  useEffect(() => {
    setLocalRepetitions(repetitions.toString());
  }, [repetitions]);

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setLocalTime(inputValue);
    
    if (inputValue === '') {
      setErrors((prev) => ({ ...prev, time: '' }));
      return;
    }
    
    const value = parseInt(inputValue, 10);
    if (isNaN(value)) {
      return;
    }
    
    try {
      timerSettingsSchema.shape.time.parse(value);
      actions.setTime(value);
      setErrors((prev) => ({ ...prev, time: '' }));
    } catch {
      setErrors((prev) => ({
        ...prev,
        time: 'Time must be between 1 and 3600 seconds',
      }));
    }
  };

  const handleRestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setLocalRest(inputValue);
    
    if (inputValue === '') {
      setErrors((prev) => ({ ...prev, rest: '' }));
      return;
    }
    
    const value = parseInt(inputValue, 10);
    if (isNaN(value)) {
      return;
    }
    
    try {
      timerSettingsSchema.shape.rest.parse(value);
      actions.setRest(value);
      setErrors((prev) => ({ ...prev, rest: '' }));
    } catch {
      setErrors((prev) => ({
        ...prev,
        rest: 'Rest must be between 0 and 600 seconds',
      }));
    }
  };

  const handleRepetitionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setLocalRepetitions(inputValue);
    
    if (inputValue === '') {
      setErrors((prev) => ({ ...prev, repetitions: '' }));
      return;
    }
    
    const value = parseInt(inputValue, 10);
    if (isNaN(value)) {
      return;
    }
    
    try {
      timerSettingsSchema.shape.repetitions.parse(value);
      actions.setRepetitions(value);
      setErrors((prev) => ({ ...prev, repetitions: '' }));
    } catch {
      setErrors((prev) => ({
        ...prev,
        repetitions: 'Repetitions must be between 1 and 100',
      }));
    }
  };

  return (
    <div className="settings">
      <div className="setting-group">
        <label htmlFor="time">Time (seconds)</label>
        <input
          id="time"
          type="number"
          value={localTime}
          onChange={handleTimeChange}
          min="1"
          max="3600"
        />
        {errors.time && <span className="error">{errors.time}</span>}
      </div>

      <div className="setting-group">
        <label htmlFor="rest">Rest (seconds)</label>
        <input
          id="rest"
          type="number"
          value={localRest}
          onChange={handleRestChange}
          min="0"
          max="600"
        />
        {errors.rest && <span className="error">{errors.rest}</span>}
      </div>

      <div className="setting-group">
        <label htmlFor="repetitions">Repetitions</label>
        <input
          id="repetitions"
          type="number"
          value={localRepetitions}
          onChange={handleRepetitionsChange}
          min="1"
          max="100"
        />
        {errors.repetitions && (
          <span className="error">{errors.repetitions}</span>
        )}
      </div>
    </div>
  );
}
