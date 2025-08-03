# Braintrust Project

This is a monorepo containing a client and a server application, containerized with Docker.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Running the Application

To get the application running, execute the following command from the root of the project:

```bash
docker compose down && docker compose up -d --force-recreate
```

This command will build the images for both the client and server, and then start the containers in detached mode.

### Accessing the Services

-   **Client:** [http://localhost:5173](http://localhost:5173)
-   **Server:** [http://localhost:3010](http://localhost:3010) 