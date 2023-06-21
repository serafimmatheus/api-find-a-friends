bibliotecas instaladas 1 - npm init -y 2 - npm i typescript @types/node tsx tsup -D 3 - npx tsc --init 4 - npm i fastify 4.1 - npm install @fastify/cors 5 - npm i dotenv 6 - npm i zod 6 - npm i @rocketseat/eslint-config -D 7 - npx eslint --init 8 - npm i prisma -D 9 - npx prisma init 10 - npm i @prisma/client 11 - npm i bcryptjs && npm i -D @types/bcryptjs 12 - npm i vitest vite-tsconfig-paths -D 13 - npm i jsonwebtoken && npm i -D @types/jsonwebtoken 14 - npm i dayjs 15 - npm i @fastify/jwt

comandos do prisma
1 - npx prisma generate 2 - npx prisma migrate dev 3 - npx prisma studio

para iniciar um docker
docker run --name "nome-do-container-do-docker" -e POSTGRESQL_USERNAME=serafim -e POSTGRESQL_PASSWORD=123456 -e POSTGRESQL_DATABASE=nomeDoBancoDeDados -p 5432:5432 bitnami/postgresql

criar um arquivo docker-compose.yml para passar o codigo acima para dentro do arquivo docker-compose.yml

e para rodar o docker -> docker compose up -d e para parar o docker -> docker compose stop e para parar deletar todos os conteiner -> docker compose down

Versoes
versao do nodeJs - v20.2.0 versao do npm - 9.6.6.
