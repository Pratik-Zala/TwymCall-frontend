FROM node:lts-alpine AS build

# Use production node environment by default
ENV NODE_ENV=production

# Make the 'app' folder the current working directory
WORKDIR /usr/src/app

# Copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./
# NOTE vite-config.js references the parent's package.json file
COPY ../package*.json ../

# Install project dependencies
RUN npm ci --include=dev

# Copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# Build app for production with minification
RUN npm run build

FROM node:lts-alpine AS dist

# Make the 'app' folder the current working directory
WORKDIR /usr/src/app

# Install serve for SPA routing support
RUN npm install -g serve

COPY --from=build /usr/src/app/dist /usr/src/app/dist

# Expose the port that the application listens on.
EXPOSE 8080

# Run the web server with SPA routing support
CMD [ "serve", "-s", "dist", "-l", "8080" ]
