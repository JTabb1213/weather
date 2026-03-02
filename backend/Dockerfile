FROM node:20-alpine3.18

# Run as non-root for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
RUN mkdir -p /opt/app && chown appuser:appgroup /opt/app

WORKDIR /opt/app

# Install production dependencies only (reproducible install)
COPY --chown=appuser:appgroup ./package.json ./package-lock.json ./
RUN npm ci --omit=dev

COPY --chown=appuser:appgroup ./ ./

USER appuser

# Cloud Run injects PORT at runtime (default 8080); server.js reads process.env.PORT
ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]