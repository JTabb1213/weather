FROM node:20-alpine3.18
RUN mkdir -p /opt/app/backend
WORKDIR /opt/app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend/ ./
COPY frontend/build/ ../frontend/build/
EXPOSE 4000
CMD [ "node", "server.js"]