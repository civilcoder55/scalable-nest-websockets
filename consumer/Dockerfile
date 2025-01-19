FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

WORKDIR /app


COPY pnpm-lock.yaml .
COPY package.json .

COPY . .

RUN pnpm install

RUN pnpm run build

##########################################################################
FROM node:20-alpine AS production

RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

WORKDIR /app

COPY pnpm-lock.yaml .
COPY package.json .

RUN pnpm install --prod

COPY --from=builder /app/dist ./dist
COPY entrypoint.sh .

RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]