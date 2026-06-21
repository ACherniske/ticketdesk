FROM node:20-alpine

WORKDIR /app

# Copy root package files for workspace resolution
COPY package.json package-lock.json ./
COPY packages/backend/package.json ./packages/backend/
COPY packages/shared/package.json ./packages/shared/

RUN npm ci

# Copy source
COPY packages/backend ./packages/backend
COPY packages/shared ./packages/shared

WORKDIR /app/packages/backend

EXPOSE 3000
CMD ["npx", "ts-node-dev", "--respawn", "src/index.ts"]
