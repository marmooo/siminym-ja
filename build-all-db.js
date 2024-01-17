import { $ } from "deno_dx";

const sizes = [5000, 10000, 30000, 1000000];
for (const size of sizes) {
  await $`bash build-dict.sh ${size}`;
  await $`bash build-db.sh ${size}`;
}
Deno.renameSync("docs/db/1000000", "docs/db/80000");
