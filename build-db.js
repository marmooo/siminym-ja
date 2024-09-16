import { Database } from "@db/sqlite";

const remoteDB = new Database("remote.db");
remoteDB.run("pragma synchronouse=OFF");
remoteDB.run("pragma journal_mode=WAL");
remoteDB.run(`
  CREATE TABLE IF NOT EXISTS siminyms (
    lemma TEXT,
    words TEXT
  )
`);
const insertCollocation = remoteDB.prepare(`
  INSERT INTO siminyms (lemma, words) VALUES(?, ?);
`);

const tsv = Deno.readTextFileSync("siminyms.tsv");
const rows = tsv.trimEnd().split("\n").map((line) => {
  return line.split("\t");
});
remoteDB.transaction((data) => {
  for (const row of data) {
    insertCollocation.run(...row);
  }
})(rows);
remoteDB.run(`
  CREATE INDEX IF NOT EXISTS siminyms_index ON siminyms(lemma)
`);
