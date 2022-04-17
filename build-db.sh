rm remote.db
deno run --allow-read --allow-write build.js
bash optimize.sh
mkdir -p docs/db
bash create_db.sh remote.db docs/db
