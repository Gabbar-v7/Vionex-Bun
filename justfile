set dotenv-required
set quiet

run-dev script:
    bun run {{script}} | pino-pretty

install:
    bun install

clean:
    find . -name "node_modules" -type d -prune -exec rm -rf {} +
    find . -name "bun.lock" -type f -prune -exec rm -f {} +

clean-install: clean install

frozen-install: clean
    bun ci
