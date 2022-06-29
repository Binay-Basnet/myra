# Install dependencies only when needed
FROM myra-deploy:node-yarn AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
WORKDIR /app
COPY . .
RUN npx nx run myra:build --configuration=production


# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/apps/myra/dist/public ./public
COPY --from=builder /app/apps/myra/dist/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/myra/dist/.next/standalone/apps/myra/ .
COPY --from=builder --chown=nextjs:nodejs /app/apps/myra/dist/.next/standalone/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/apps/myra/dist/.next/static ./dist/.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# RUN ls
CMD ["node", "server.js"]

