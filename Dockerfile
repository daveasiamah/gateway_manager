# Specify the base image
FROM node:14.17-alpine

# Set the working directory in the container
WORKDIR /

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the app's dependencies
RUN npm install

# Copy the app's source code to the container
COPY . .

# Build the React app
RUN npm run build

# Set the environment variables
ENV PORT=3000
ENV MONGODB_URI=mongodb://localhost:27017/gateway-manager
ENV MONGO_URI=mongodb+srv://<username>:<password>@<database_name>/?retryWrites=true&w=majority
ENV BASE_SERVER_URI=localhost:7000/api
ENV NODE_ENV=production

# Expose the app's port
EXPOSE ${PORT}

# Start the server
CMD ["npm", "start"]
