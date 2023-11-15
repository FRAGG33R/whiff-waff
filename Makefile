CE=./app/docker-compose.yml
CMD=docker compose -f ${CE}
up:
	${CMD} up --build
down:
	${CMD} down

fclean:
	rm -rf ./app/client/whiff-client/node_modules
	rm -rf ./app/client/whiff-client/.next
	rm -rf ./app/server/whiff-whaff/node_modules
	rm -rf ./app/server/whiff-whaff/prisma/migrations
	rm -rf ./app/server/whiff-whaff/dist
	rm -rf ./app/whiff-data/*

re: fclean up
