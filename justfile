set dotenv-required
set quiet

default:
    just --list

[arg("production", long="production", value="true")]
run script production="false":
    if [ {{ production }} == "false" ]; then bun run {{ script }} | pino-pretty; else bun run {{ script }}; fi

drizzle-kit *command:
    cd packages/db && bunx drizzle-kit {{ command }}

auth-kit *command:
    bunx --bun auth {{ command }} --cwd packages/auth --config server.ts

install:
    bun install

frozen-install:
    bun ci

clean:
    find . -type d -name node_modules -prune -exec rm -rf {} +
    find . -type f -name bun.lock -delete
    rm -rf apps/web/.next
