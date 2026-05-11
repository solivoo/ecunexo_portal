FROM node:22-alpine AS deps
WORKDIR /app
RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG VITE_MAIL_SERVICE_URL=http://localhost:4001
ENV VITE_MAIL_SERVICE_URL=${VITE_MAIL_SERVICE_URL}
ARG VITE_SYNCFUSION_LICENSE=
ENV VITE_SYNCFUSION_LICENSE=${VITE_SYNCFUSION_LICENSE}
RUN pnpm run build

FROM nginx:alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
