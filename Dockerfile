# syntax=docker/dockerfile:1

# ---- Build stage ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package manifests first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci --include=optional

# Copy source files needed for the client build only
COPY client ./client
COPY shared ./shared
COPY vite.config.ts tsconfig.json postcss.config.js tailwind.config.ts components.json ./

# Vite embeds VITE_* variables at build time.
# Provide defaults for local builds; override in CI/GitHub Actions via --build-arg.
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_FIRESTORE_PROJECT_ID
ENV VITE_GOOGLE_CLIENT_ID=${VITE_GOOGLE_CLIENT_ID:-107916257043-3aevfkqadmi1lr2en0do36spka72gjt5.apps.googleusercontent.com}
ENV VITE_FIRESTORE_PROJECT_ID=${VITE_FIRESTORE_PROJECT_ID:-days-fit-471521}

# Build only the static Vite output (server folder is intentionally excluded)
RUN npx vite build

# ---- Runtime stage ----
FROM nginx:alpine

# Copy built static assets to Nginx web root
COPY --from=builder /app/dist/public /usr/share/nginx/html

# Use a custom Nginx config that supports client-side routing (SPA fallback)
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location ~* \\.(?:js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|otf|webmanifest)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
