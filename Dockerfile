FROM node:18-alpine

WORKDIR /app

# Install production deps only
COPY package*.json ./
RUN npm install --omit=dev

# Copy project files
COPY . .

EXPOSE 4000

# Run the server entry
CMD ["node", "server/index.cjs"]
