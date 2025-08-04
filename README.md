# Braintrust Project

This is a monorepo containing a client and a server application, containerized with Docker.

## Tech Stack

**Frontend:**
- React with TypeScript
- Vite for fast development and building
- Themable shadcn/ui design system with Tailwind CSS
- TanStack React Query for server state management
- TRPC for end-to-end type-safe API communication

**Backend:**
- NestJS modular monolith with Domain-Driven Design (DDD)
- TypeORM with PostgreSQL
- JWT authentication with role-based access control
- Zod for schema validation
- Database migrations with automatic seeding

**Infrastructure:**
- Docker and Docker Compose for containerization
- PostgreSQL database

## Architecture Highlights

- **Server-Side Calculations**: All business logic, calculations, and use cases are executed on the backend with proper SQL queries, aggregations, and grouping
- **No Hardcoded Data**: The client UI has no hardcoded pages or data - everything is fetched dynamically from the server
- **Responsive Design**: Fully responsive UI that adapts to mobile, tablet, and desktop breakpoints
- **Role-Based Security**: JWT authentication with client users restricted from accessing admin TRPC procedures and pages
- **Performance Optimized**: Lazy loading for fast UI page loads with skeleton loading states and error boundaries
- **Error Resilience**: Comprehensive error handling - if any error occurs, the server doesn't crash and provides graceful fallbacks

## Testing Error Handling and Loading States

To test the skeleton loading and error handling in the UI:

1. First login with any user
2. Shutdown the server container
3. Refresh the page to see error boundaries and loading skeletons in action

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Running the Application

To get the application running, execute the following command from the root of the project:

```bash
docker compose down && docker compose up -d --force-recreate
```

**Note:** The server container automatically runs migrations to create the database schema and seed it. You may need to wait a few seconds for the container to finish initializing before the client becomes available.

This command will build the images for both the client and server, and then start the containers in detached mode.

### Accessing the Services

-   **Client:** [http://localhost:5173](http://localhost:5173)
-   **Server:** [http://localhost:3010](http://localhost:3010)