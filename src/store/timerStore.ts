import { create } from 'zustand';

export interface TimerState {
  time: number;
  rest: number;
  repetitions: number;
  isRunning: boolean;
  isRestPeriod: boolean;
  currentRep: number;
  resetTrigger: number;
  actions: {
    setTime: (time: number) => void;
    setRest: (rest: number) => void;
    setRepetitions: (repetitions: number) => void;
    start: () => void;
    pause: () => void;
    resume: () => void;
    reset: () => void;
    nextRep: () => void;
    enterRestPeriod: () => void;
  };
}

const useTimerStore = create<TimerState>((set) => ({
  time: 120,
  rest: 30,
  repetitions: 8,
  isRunning: false,
  isRestPeriod: false,
  currentRep: 1,
  resetTrigger: 0,
  actions: {
    setTime: (time) => set({ time }),
    setRest: (rest) => set({ rest }),
    setRepetitions: (repetitions) => set({ repetitions }),
    start: () => set({ isRunning: true }),
    pause: () => set({ isRunning: false }),
    resume: () => set({ isRunning: true }),
    reset: () =>
      set((state) => ({
        isRunning: false,
        isRestPeriod: false,
        currentRep: 1,
        resetTrigger: state.resetTrigger + 1,
      })),
    nextRep: () =>
      set((state) => ({
        currentRep: state.currentRep + 1,
        isRestPeriod: false,
      })),
    enterRestPeriod: () => set({ isRestPeriod: true }),
  },
}));

export default useTimerStore;
