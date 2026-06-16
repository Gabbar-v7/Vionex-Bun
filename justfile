set dotenv-required
set quiet

run script:
    bun run {{script}}

install:
    bun install

clean:
    find . -name "node_modules" -type d -prune -exec rm -rf {} +

clean-install: clean install