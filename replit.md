# HomeGym Pro - 3-Day Workout Tracker

## Overview

HomeGym Pro is a comprehensive fitness tracking application designed for home gym enthusiasts. The application provides a structured 3-day workout program (Upper Body, Back & Core, Legs & Glutes) and allows users to log their workout sessions locally without requiring authentication. Built as a full-stack application with a React frontend and Express backend, it focuses on simplicity and privacy by storing workout data in the browser's local storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built using **React 18** with **TypeScript** and follows a component-based architecture:

- **Routing**: Uses Wouter for lightweight client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state and local React state for UI components
- **UI Framework**: Shadcn/UI components built on top of Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
The backend uses **Express.js** with TypeScript in a minimalist setup:

- **Server Framework**: Express with custom middleware for logging and error handling
- **Storage Interface**: Abstract storage interface (IStorage) with in-memory implementation
- **API Structure**: RESTful endpoints under `/api` prefix (currently placeholder)
- **Development Integration**: Vite middleware integration for seamless full-stack development

### Data Storage Solutions
The application uses a hybrid storage approach:

- **Client-side Storage**: Browser localStorage for workout logs and user data (privacy-focused, no server required)
- **Server-side Storage**: In-memory storage implementation with interface for future database integration
- **Database Ready**: Drizzle ORM configured for PostgreSQL with Neon Database integration
- **Schema Management**: Shared TypeScript schemas using Zod for validation across client and server

### Authentication and Authorization
Currently implements a **no-authentication** approach prioritizing user privacy:

- No user registration or login required
- All data stored locally in browser
- Session-less design for simplicity
- Ready for future authentication integration through the existing storage interface

### External Dependencies

- **Database**: Neon Database (PostgreSQL) configured but not actively used
- **ORM**: Drizzle ORM for type-safe database operations
- **UI Components**: Radix UI primitives for accessible component foundation
- **Validation**: Zod for runtime type checking and form validation
- **Styling**: Tailwind CSS for utility-first styling
- **Development**: Replit-specific plugins for development environment integration
- **Image Assets**: Unsplash for workout exercise imagery
- **Typography**: Google Fonts (Inter) for consistent typography

The architecture is designed to be scalable and maintainable, with clear separation of concerns between frontend and backend, while maintaining the flexibility to add database persistence and user authentication in the future.