# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the Vite development server runs on
EXPOSE 5173

# The command to run the development server
# Using "--host" is important to expose the server to the host machine
CMD ["npm", "run", "dev", "--", "--host"] 