FROM node:16-alpine

WORKDIR /app

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY apps/migration/dist/public ./public
COPY apps/migration/dist/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --chown=nextjs:nodejs apps/migration/dist/.next/standalone/apps/migration/ .
COPY --chown=nextjs:nodejs apps/migration/dist/.next/standalone/node_modules ./node_modules
COPY --chown=nextjs:nodejs apps/migration/dist/.next/static ./dist/.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
