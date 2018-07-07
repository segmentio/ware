default: test

HARMONY_OPTS = `node --v8-options | grep --only-matching -- '--harmony_generators'`

node_modules: package.json
	@npm install

test: node_modules
	@./node_modules/.bin/mocha \
		$(HARMONY_OPTS) \
		--require co-mocha \
		--require gnode \
		--reporter spec

.PHONY: test
