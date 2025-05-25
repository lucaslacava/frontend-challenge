# Frontend Challenge

## Technology Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: TailwindCSS for utility-first styling
- **UI Components**: Custom components built with shadcn
- **Routing**: React Router v7

## Architecture Decisions

### Component Structure

The application follows a modular component architecture:

- `components/`: Reusable UI components
  - `layout/`: layout components used in different pages
  - `ui/`: basic ui components from shadcn
- `pages/`: Page-level components
  - `steps/`: components for each step/page
- `context/`: React Context provider for state management
- `service/`: API and service layer
- `lib/`: Utility functions and shared logic

### State Management

- React Context is used for global state management
- Local component state for UI-specific state
- Color options were saved to the context to avoid refetching when moving back and forth steps ()

### Styling

- TailwindCSS for utility-first styling
- Custom components built on top of Radix UI using shadcn
- Class Variance Authority (cva) for component variants

### Testing Strategy

- TBD

## Extra Features

- Email validation on first screen
- Next button enabled only when fields are filled
- Routes protected so the user cannnot go straight to `/confirmation` for example

## Development Workflow

1. Run `yarn start` to start both frontend and mock server
2. Use `yarn test` for running tests
