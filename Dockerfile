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
FROM nginx:alpine

# Copy built static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create directories for nginx to write to
RUN mkdir -p /tmp/nginx/cache /tmp/nginx/run && \
    chown -R nginx:nginx /tmp/nginx && \
    chown -R nginx:nginx /usr/share/nginx/html

# Create custom nginx configuration that works with non-root user
RUN echo 'pid /tmp/nginx/run/nginx.pid; \
events { \
    worker_connections 1024; \
} \
http { \
    client_body_temp_path /tmp/nginx/cache/client_temp; \
    proxy_temp_path /tmp/nginx/cache/proxy_temp; \
    fastcgi_temp_path /tmp/nginx/cache/fastcgi_temp; \
    uwsgi_temp_path /tmp/nginx/cache/uwsgi_temp; \
    scgi_temp_path /tmp/nginx/cache/scgi_temp; \
    include /etc/nginx/mime.types; \
    default_type application/octet-stream; \
    server { \
        listen 8080; \
        root /usr/share/nginx/html; \
        index index.html; \
        location / { \
            try_files $uri $uri/ /index.html; \
        } \
    } \
}' > /etc/nginx/nginx.conf

# Switch to non-root user
USER nginx

# Expose application port
EXPOSE 8080

# Start nginx with custom config
CMD ["nginx", "-g", "daemon off;"]