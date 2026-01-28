FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV DATABASE_URL="postgresql://fake:fake@localhost:5432/fake"

RUN npx prisma generate
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]