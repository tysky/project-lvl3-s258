install:
	npm install

develop:
	npm run webpack-serve

build:
	rm -rf dist
	NODE_ENV=production npm run webpack

test:
	npm test

lint:
	npm run eslint .

publish:
	npm publish

.PHONY: test
