FROM node:20.9.0
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN apt update && apt install stress --yes
COPY . .
RUN npm run compile
HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 CMD curl -f http://localhost:3000/health
EXPOSE 3000
CMD ["npm", "start"]