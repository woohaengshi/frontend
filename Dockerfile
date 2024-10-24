# 빌드 --------------------------------
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

# 실행 --------------------------------
FROM node:18-alpine
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public

COPY package*.json ./
RUN npm install --only=production

ENV NEXT_PUBLIC_BASE_URL=https://dev.woorifisa.shop/
ENV NEXT_PUBLIC_API_ROUTE_URL=http://localhost:3000/

ENTRYPOINT [ "npm", "start" ]