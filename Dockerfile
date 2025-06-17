FROM node:lts AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY .env.example ./.env
COPY . .
RUN npm run build

FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

RUN npm install -g serve

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]