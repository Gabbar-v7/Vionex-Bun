set dotenv-required
set quiet

default:
    just --list

[arg("dev", long="dev", value="true")]
run script dev="false":
    if [ {{dev}} == "true" ]; then bun run {{script}} | pino-pretty; else bun run {{script}}; fi

install:
    bun install

clean:
    find . -type d -name node_modules -prune -exec rm -rf {} +
    find . -type f -name bun.lock -delete

clean-install: clean install

frozen-install: clean
    bun ci
