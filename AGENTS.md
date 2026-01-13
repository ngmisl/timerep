# AGENTS.md - timerep Project Guidelines

## Project Overview

**timerep** is a simple offline-first, mobile-optimized Progressive Web App (PWA) for workout timer functionality. Users can configure three settings:
- **Time**: Workout duration (e.g., 2 minutes)
- **Rest**: Rest time between repetitions (e.g., 30 seconds)
- **Repetitions**: Number of workout cycles

The app features start/pause/resume/reset buttons based on timer state and includes visual feedback (flicker/animation) in the last 5 seconds of each repetition.

## Technology Stack

- **Runtime**: Bun
- **Build Tool**: Vite
- **State Management**: Zustand
- **Validation**: Zod
- **Framework**: React 19 with TypeScript
- **Theme**: Simple, elegant dark mode

## Commands

### Development
```bash
bun run dev        # Start development server
bun run build      # Build for production
bun run preview    # Preview production build
bun run lint       # Run ESLint
```

### Build
```bash
bun run build      # TypeScript compile + Vite build
# Compiles TypeScript (tsc -b) then bundles with Vite
```

### Lint
```bash
bun run lint       # Run ESLint on all files
# No test framework is currently configured
```

## Code Style Guidelines

### Imports

1. **Order**: External libraries → Internal modules → Component imports → Styles
2. **Grouping**: Separate groups with blank lines
3. **Aliases**: No path aliases configured, use relative imports

```typescript
// External libraries
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { create } from 'zustand';

// Internal modules
import { calculateTimeLeft } from './utils/timeUtils';
import { timerSettingsSchema } from './validation/schemas';

// Component imports
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';

// Styles
import './TimerView.css';
```

### Formatting

1. **Indentation**: 2 spaces (no tabs)
2. **Line Length**: Max 100 characters
3. **Semicolons**: Required at end of statements
4. **Quotes**: Single quotes for strings, double quotes only when needed for escaping
5. **Trailing Commas**: Required in multi-line objects/arrays
6. **Spacing**: Space after keywords (`if (`, `function (`, etc.)

### TypeScript Types

1. **Interfaces vs Types**:
   - Use `interface` for object shapes that can be extended
   - Use `type` for unions, intersections, and primitive types

```typescript
// Interface - preferred for object shapes
interface TimerSettings {
  time: number;
  rest: number;
  repetitions: number;
}

// Type - preferred for unions and computed types
type TimerState = 'idle' | 'running' | 'paused' | 'resting';
```

2. **Component Props**: Use interfaces, export if reused

```typescript
interface TimerDisplayProps {
  currentTime: number;
  isRestPeriod: boolean;
  repetitions: number;
  currentRep: number;
}
```

3. **Type Safety**: Never use `any`, `@ts-ignore`, or `@ts-expect-error`
4. **Zod Schemas**: Use `.infer()` to derive types from schemas

```typescript
import { z } from 'zod';

const timerSettingsSchema = z.object({
  time: z.number().min(1).max(3600),           // 1 second to 1 hour
  rest: z.number().min(0).max(600),           // 0 to 10 minutes
  repetitions: z.number().min(1).max(100),    // 1 to 100 reps
});

type TimerSettings = z.infer<typeof timerSettingsSchema>;
```

### Naming Conventions

1. **Components**: PascalCase (TimerDisplay.tsx, Controls.tsx)
2. **Functions/Variables**: camelCase (calculateTimeLeft, setIsRunning)
3. **Constants**: UPPER_SNAKE_CASE (MAX_REPETITIONS, DEFAULT_REST_TIME)
4. **Interfaces/Types**: PascalCase (ITimerState, TimerProps)
5. **CSS Classes**: kebab-case (.timer-display, .control-button)
6. **Custom Hooks**: camelCase with 'use' prefix (useTimer, useTimerState)

### React Patterns

1. **Component Structure**:
   ```typescript
   // Imports
   import { useState, useEffect } from 'react';

   // Types
   interface ComponentProps { /* ... */ }

   // Component
   function ComponentName({ prop1, prop2 }: ComponentProps) {
     // State
     const [state, setState] = useState<Type>(initialValue);

     // Effects
     useEffect(() => { /* ... */ }, [deps]);

     // Handlers
     const handleAction = () => { /* ... */ };

     // Render
     return <div>...</div>;
   }

   export default ComponentName;
   ```

2. **State Management**:
   - Use Zustand for global state (timer settings, current state)
   - Use React state for local component state
   - Keep state minimal and derived where possible

   ```typescript
   // store/timerStore.ts
   import { create } from 'zustand';

   interface TimerState {
     time: number;
     rest: number;
     repetitions: number;
     isRunning: boolean;
     isRestPeriod: boolean;
     currentRep: number;
     actions: {
       setTime: (time: number) => void;
       setRest: (rest: number) => void;
       start: () => void;
       pause: () => void;
       reset: () => void;
     };
   }

   const useTimerStore = create<TimerState>((set) => ({
     time: 120,
     rest: 30,
     repetitions: 8,
     isRunning: false,
     isRestPeriod: false,
     currentRep: 1,
     actions: {
       setTime: (time) => set({ time }),
       setRest: (rest) => set({ rest }),
       start: () => set({ isRunning: true }),
       pause: () => set({ isRunning: false }),
       reset: () => set({
         isRunning: false,
         isRestPeriod: false,
         currentRep: 1,
       }),
     },
   }));

   export default useTimerStore;
   ```

3. **Custom Hooks**:
   - Extract reusable timer logic into custom hooks
   - Start with 'use' prefix

   ```typescript
   // hooks/useTimer.ts
   import { useEffect, useState, useRef } from 'react';
   import useTimerStore from '../store/timerStore';

   function useTimer() {
     const { time, rest, isRunning, isRestPeriod, currentRep, actions } = useTimerStore();
     const [currentTime, setCurrentTime] = useState(time);
     const intervalRef = useRef<NodeJS.Timeout | null>(null);

     useEffect(() => {
       if (isRunning) {
         intervalRef.current = setInterval(() => {
           setCurrentTime((prev) => {
             if (prev <= 0) {
               // Handle timer completion
               return 0;
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
     }, [isRunning]);

     return { currentTime, ...actions };
   }

   export default useTimer;
   ```

### CSS and Styling

1. **Dark Mode**: Use CSS variables with `prefers-color-scheme`
   ```css
   :root {
     --bg-primary: #1a1a1a;
     --bg-secondary: #2d2d2d;
     --text-primary: #ffffff;
     --text-secondary: #a0a0a0;
     --accent: #4a9eff;
   }

   @media (prefers-color-scheme: light) {
     :root {
       --bg-primary: #ffffff;
       --bg-secondary: #f0f0f0;
       --text-primary: #1a1a1a;
       --text-secondary: #666666;
     }
   }
   ```

2. **Mobile-First**: Design for mobile first, use media queries for larger screens
3. **Touch-Friendly**: Minimum 44px tap targets
4. **Animations**: Add visual feedback in last 5 seconds

   ```css
   .timer-display {
     /* Base styles */
     transition: opacity 0.2s ease;
   }

   .timer-display.warning {
     animation: flicker 0.5s infinite;
   }

   @keyframes flicker {
     0%, 100% { opacity: 1; }
     50% { opacity: 0.7; }
   }
   ```

### Error Handling

1. **Validation**: Use Zod for all user inputs
   ```typescript
   const result = timerSettingsSchema.parse(formData);
   ```

2. **Graceful Errors**: Handle errors with user-friendly messages
   ```typescript
   try {
     const result = timerSettingsSchema.parse(formData);
     // Proceed with validated data
   } catch (error) {
     if (error instanceof z.ZodError) {
       console.error('Validation failed:', error.flatten());
       // Show error to user
     }
   }
   ```

3. **Logging**: Use `console.error()` for errors, avoid empty catch blocks

### File Organization

```
src/
├── components/
│   ├── TimerDisplay.tsx       # Shows current time and repetition
│   ├── Controls.tsx            # Start/Pause/Resume/Reset buttons
│   ├── Settings.tsx            # Time, rest, repetitions inputs
│   └── index.ts                # Component exports
├── hooks/
│   ├── useTimer.ts             # Timer logic hook
│   └── index.ts                # Hook exports
├── store/
│   ├── timerStore.ts           # Zustand store for timer state
│   └── index.ts                # Store exports
├── utils/
│   ├── timeUtils.ts            # Time formatting utilities
│   └── index.ts                # Utility exports
├── validation/
│   ├── schemas.ts              # Zod validation schemas
│   └── index.ts                # Validation exports
├── styles/
│   ├── global.css              # Global styles and dark mode
│   └── animations.css          # Animation keyframes
├── assets/                     # Images, icons
├── App.tsx                     # Main app component
└── main.tsx                    # Entry point
```

### Testing

Currently no test framework is configured. To add testing:
- Consider Vitest for unit tests
- Consider React Testing Library for component tests

### Required Functionality Checklist

- [ ] Three configurable settings: time, rest, repetitions
- [ ] Start/Pause/Resume/Reset buttons based on timer state
- [ ] Visual feedback (flicker/animation) in last 5 seconds
- [ ] Offline-first PWA implementation
- [ ] Mobile-optimized responsive design
- [ ] Simple, elegant dark mode theme
- [ ] State management with Zustand
- [ ] Form validation with Zod
- [ ] Touch-friendly UI (minimum 44px tap targets)
