default: test

HARMONY_OPTS = `node --v8-options | grep --only-matching -- '--harmony_generators'`

node_modules: package.json
	@npm install

test: node_modules
	@npm test

.PHONY: test
