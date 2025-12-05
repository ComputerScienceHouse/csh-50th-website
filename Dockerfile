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
FROM nginxinc/nginx-unprivileged 

# Copy built static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create nginx configuration for SPA routing
RUN echo 'server { \
    listen 8080; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Non-root user (required for OKD)
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

# Expose application port
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]