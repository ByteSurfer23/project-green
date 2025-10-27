# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Accept build-time environment variables
ARG MONGO_URL
ARG PORT

# Make them available at runtime
ENV MONGO_URI=$MONGO_URL
ENV PORT=$PORT

# Expose port
EXPOSE $PORT

# Start app
CMD ["npm", "start"]
