all: lib/index.js

lib/%.js: src/%.jsx
	mkdir -p $(@D)
	node_modules/.bin/babel -o $@ $<
