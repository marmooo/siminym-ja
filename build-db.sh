rm remote.db
rm -rf docs/db
deno run --allow-read --allow-write build.js
bash optimize.sh
mkdir -p docs/db
bash create_db.sh remote.db docs/db
