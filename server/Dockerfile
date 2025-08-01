# Stage 1: Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Stage 2: Production stage
FROM node:20-alpine

WORKDIR /app

# Copy dependencies from build stage
COPY --from=build /app/node_modules ./node_modules
# Copy application code
COPY --from=build /app .

# Expose the port the app runs on
EXPOSE 3010

# The command to start the application
CMD ["npm", "run", "start:dev"]
