# --- Build Stage ---
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies first (take advantage of Docker caching)
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build the Vite app (produces static files in dist/)
RUN npm run build


# --- Runtime Stage ---
FROM nginxinc/nginx-unprivileged:stable-alpine

# Remove the user directive from the nginx configuration
RUN sed -i '/^user/d' /etc/nginx/nginx.conf

# Copy built static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose application port
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]