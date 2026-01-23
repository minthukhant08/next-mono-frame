## Nextjs Monolithic Framework
This is a boiler template for developing nextjs with monolithic style using prisma ORM. Authentications is done by `JWT` + `Next-Auth`. All mutation requests call are handled by `server-actions`. For `GET` requests, they are handled by custome `fetch-client` based on nextjs's `Fetch API` in order to make full use of nextjs' `caching`.

## Local environment
- postgres database (can either use local db or use db container prepared by compose file.)
- copy `example.env` file to `.env` and then uncomment `DATABASE_URL` and update connection string.
- `npm install` - install dependencies
- `npm run db:generate` -  migrate database
- `npm run db:seed` - run seeders (default cred => admin@admin.com, password)
- `npm run dev` - start dev server
- `npm run db:studio` - launch database client 
- `docker compose up postgres -d` if you don't have local db setup

## production environment
- copy `example.env` file to `.env` and edit values
- `docker compose up -d` to run containers
- `docker compose up --rm prisma sh` if you want to use prisma cli
