install:
	docker run -ti --rm \
		-v $(shell pwd):/usr/src/app \
		-w /usr/src/app \
		-u "node" \
		node:slim \
		npm install

code:
	docker run -ti --rm \
		-v $(shell pwd):/usr/src/app \
		-w /usr/src/app \
		-p 3001\:3001 \
		-u "node" \
		node:slim \
		bash

dev:
	python3 -m webbrowser http://localhost:3002/
	docker run -ti --rm \
		-v $(shell pwd):/usr/src/app \
		-w /usr/src/app \
		-p 3002\:3001 \
		-u "node" \
		node:slim \
		npm run dev

build:
	docker run -ti --rm \
		-v $(shell pwd):/usr/src/app \
		-w /usr/src/app \
		-u "node" \
		node:slim \
		npm run build
