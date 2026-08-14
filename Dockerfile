FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --workspaces=false
COPY tsconfig.json ./
COPY src ./src
COPY migrations ./migrations
RUN npm run build:bot

FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --workspaces=false
COPY --from=build /app/dist ./dist
COPY migrations ./migrations
COPY brand/badges/discord ./brand/badges/discord
COPY brand/poses/razz-celebrate.png ./brand/poses/razz-celebrate.png
RUN mkdir -p /app/data && chown -R node:node /app
USER node
EXPOSE 3000
CMD ["node", "dist/src/index.js"]
