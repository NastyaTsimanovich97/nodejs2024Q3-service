# Use an official Node.js image as a parent image  
FROM node:22  

# Set the working directory inside the container  
WORKDIR /app  

# Copy package.json and package-lock.json into the working directory  
COPY package*.json ./  

# Install the dependencies  
RUN npm install  

# Copy the rest of the application code into the working directory  
COPY . .  

# Build the NestJS application  
RUN npm run build  

# Expose the port that the application runs on  
EXPOSE 3000  

# Start the application  
CMD [ "npm", "run", "start:dev" ]