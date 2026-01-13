# timerep

**timerep** is a simple, offline-first, mobile-optimized Progressive Web App (PWA) designed for workout timing. It provides an elegant and focused interface for managing workout intervals, rest periods, and repetitions.

## 🚀 Features

- **Interval Training**: Configure workout duration, rest time, and number of repetitions.
- **Dynamic Controls**: Start, pause, resume, and reset functionality based on current timer state.
- **Visual Cues**: Intuitive visual feedback (flicker animation) in the last 5 seconds of each interval to alert the user.
- **Offline-First**: Built as a PWA for reliable use even without an internet connection.
- **Mobile-Optimized**: Touch-friendly interface with minimum 44px tap targets for ease of use during workouts.
- **Elegant Dark Mode**: A professional dark theme designed for high visibility and reduced eye strain.

## 🛠️ Technology Stack

- **Runtime**: [Bun](https://bun.sh/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Framework**: [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Validation**: [Zod](https://zod.dev/)
- **Styling**: Pure CSS with CSS Variables for Dark Mode

## 📂 Project Structure

```text
src/
├── assets/             # Static assets (images, icons)
├── components/         # React components (TimerDisplay, Controls, Settings)
├── hooks/              # Custom React hooks (useTimer)
├── store/              # Zustand state management
├── styles/             # CSS styles and animations
├── utils/              # Utility functions and helpers
├── validation/         # Zod schemas for input validation
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🏁 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd timerep
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

### Development

Start the development server:
```bash
bun run dev
```

### Build

Build the project for production:
```bash
bun run build
```

Preview the production build:
```bash
bun run preview
```

### Linting

Run ESLint to check for code quality:
```bash
bun run lint
```

## 📜 Code Style Guidelines

- **Indentation**: 2 spaces.
- **Quotes**: Single quotes preferred for strings.
- **Type Safety**: No `any` types; all components and functions are strictly typed.
- **Naming**: PascalCase for components, camelCase for functions and variables, UPPER_SNAKE_CASE for constants.
- **Zod**: All user inputs are validated using Zod schemas.

## 📄 License

This project is licensed under the MIT License.
