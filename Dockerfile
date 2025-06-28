# ==============================
# 👷 构建阶段：使用 pnpm 构建项目
# ==============================
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 启用 corepack 并设置 pnpm
RUN corepack enable && corepack prepare pnpm@10.10.0 --activate

# 配置 pnpm 镜像源和超时设置
RUN pnpm config set registry https://registry.npmmirror.com/ && \
    pnpm config set network-timeout 600000 && \
    pnpm config set fetch-timeout 600000 && \
    pnpm config set fetch-retry-mintimeout 10000 && \
    pnpm config set fetch-retry-maxtimeout 120000

# 复制 package.json 和 pnpm-lock.yaml（如果存在）
COPY package.json ./
COPY pnpm-lock.yaml* ./

# 安装依赖（带重试机制）
RUN pnpm install --frozen-lockfile --prefer-offline || \
    (echo "安装失败，清理缓存后重试..." && \
     pnpm store prune && \
     rm -rf node_modules && \
     pnpm install --no-frozen-lockfile --prefer-offline) || \
    (echo "仍然失败，使用npm镜像重试..." && \
     pnpm config set registry https://registry.npm.taobao.org/ && \
     pnpm install --no-frozen-lockfile --prefer-offline)

# 复制项目文件
COPY . .

# 设置环境变量并构建
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
