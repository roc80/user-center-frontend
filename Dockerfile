# ==============================
# 👷 构建阶段：使用 pnpm 构建项目
# ==============================
FROM node:18-alpine AS builder

# 启用 corepack 并设置 pnpm（确保 pnpm 与项目一致）
RUN corepack enable && corepack prepare pnpm@10.10.0 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

ENV NODE_ENV=production
ENV UMI_ENV=prod

RUN pnpm run build

# ==============================
# 🚀 运行阶段：使用 Nginx 托管静态文件
# ==============================
FROM nginx:stable-alpine

# 拷贝自定义 nginx 配置
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

# 拷贝构建产物到 Nginx 目录
COPY --from=builder /app/dist /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
