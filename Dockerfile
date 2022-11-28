FROM node:14
COPY ./ /app
WORKDIR /app
RUN pnpm install && pnpm build

FROM nginx
RUN mkdir /app
COPY --from=0 /app/build /app
COPY nginx.conf /etc/nginx/nginx.conf