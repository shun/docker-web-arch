# remove comment
exec sudo -HEu node sed -i.bak '/^\/\*.*\*\/$/d' tsconfig.json

# execute patch
exec sudo -HEu node npx ts-node --project customize/tsconfig.json customize/customize-json.ts

exec sudo -HEu node "$@"
