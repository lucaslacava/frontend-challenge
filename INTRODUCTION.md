# Frontend Challenge

## Technology Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: TailwindCSS for utility-first styling
- **UI Components**: Custom components built with shadcn
- **Routing**: React Router v7
- **Testing**: Jest + RTL (unit) and Cypress (e2e)

## Architecture Decisions

### Component Structure

The application follows a modular component architecture:

- `components/`: Reusable UI components
  - `layout/`: layout components used in different pages
  - `ui/`: basic ui components from shadcn
- `pages/`: Page-level components
  - `steps/`: Components for each step/page of the form
- `context/`: React Context provider for state management
- `service/`: API integration and service logic
- `lib/`: Utility functions and shared logic
- `/e2e`: E2E test cases and test utils
- `/__tests__`: unit tests for components, utilities and services

### State Management

- React Context is used for global state management
- Local component state for UI-specific state
- Color options were saved to the context to avoid refetching when navigating back and forth steps.

### Styling

- TailwindCSS for utility-first styling
- Custom components built on top of Radix UI using shadcn
- Class Variance Authority (cva) for component variants

### Testing Strategy

#### Unit Testing (Jest + RTL)

- Test coverage includes layout components, utility functions, and API error handling.

  ![unit tests log](/public/unit-tests-log.png)

#### End-to-End Testing (Cypress)

- Using Cypress to test e2e user flow, validations, error states, and routing:

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
2. Use `yarn test` for running unit tests
3. Run `yarn cypress:run` or `yarn cypress:open` to run e2e tests
