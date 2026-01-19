FROM node:24.13.0-alpine AS deps
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

WORKDIR /app
COPY package.json package-lock.json ./
RUN sed -i '/"prepare":/d' package.json
RUN npm install

FROM node:24.13.0-alpine AS builder
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:24.13.0-alpine AS runner
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public 
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]