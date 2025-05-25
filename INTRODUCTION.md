# Frontend Challenge

## Technology Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: TailwindCSS for utility-first styling
- **UI Components**: Custom components built with shadcn
- **Routing**: React Router v7
- **Testing**: Cypress

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
- `/e2e`: Test cases and test utils

### State Management

- React Context is used for global state management
- Local component state for UI-specific state
- Color options were saved to the context to avoid refetching when moving back and forth steps ()

### Styling

- TailwindCSS for utility-first styling
- Custom components built on top of Radix UI using shadcn
- Class Variance Authority (cva) for component variants

### Testing Strategy

- Using Cypress to test e2e flow

  - Should complete the entire form flow successfully
  - Should handle form validation
  - Should handle navigation between steps
  - Should handle error state
  - Should validate More Info form fields

- ![e2e tests log](/public/cypress-log.png)

## Extra Features

- Email validation on first screen
- Next button enabled only when fields are filled
- Routes protected so the user cannnot go straight to `/confirmation`

## Development Workflow

1. Run `yarn start` to start both frontend and mock server
2. Use `yarn test` for running tests
3. Run `yarn cypress:run` or `yarn cypress:open` to run e2e tests
