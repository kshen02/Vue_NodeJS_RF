# Use official Node.js image as a base image
FROM node:20.15.0-alpine3.20

# Set the working directory
WORKDIR /app

# Install build dependencies and SQLite
RUN apk update && apk add --no-cache \
    build-base \
    sqlite \
    sqlite-dev

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project files to working directory
COPY . .

# Expose the port on which the app runs
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
