FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "npx prisma db push --force-reset && npx prisma db seed && npm run start:dev"]
