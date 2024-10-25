# Step 1: Use Node.js image to build the React app
FROM node:16 as build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY client/package.json client/package-lock.json ./
RUN npm install

# Copy the rest of the client code and build the app
COPY client/ .
RUN npm run build

# Step 2: Use Nginx to serve the React app
FROM nginx:alpine

# Copy built files from the previous stage to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]