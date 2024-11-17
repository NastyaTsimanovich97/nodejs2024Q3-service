# Use an official Node.js runtime as a parent image
FROM node:22

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code
COPY . .

# Build the application (if using TypeScript)
RUN npm run build

# Expose the application port (replace 4000 with the port your app uses)
EXPOSE 4000

# Start the application
CMD ["npm", "run", "start:dev"]
