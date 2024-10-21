# Use the official Node.js image as a base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on (change this to your app's port if needed)
EXPOSE 3000

# Command to run your application
CMD ["node", "index.js"]
