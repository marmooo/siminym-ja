import { readLines } from "https://deno.land/std/io/mod.ts";
import { DB } from "https://deno.land/x/sqlite@v3.3.0/mod.ts";

const remoteDB = new DB("remote.db");
remoteDB.query("pragma synchronouse=OFF");
remoteDB.query("pragma journal_mode=WAL");
remoteDB.query(`
  CREATE TABLE IF NOT EXISTS siminyms (
    lemma TEXT,
    words TEXT
  )
`);
const insertCollocation = remoteDB.prepareQuery(`
  INSERT INTO siminyms (lemma, words) VALUES(?, ?);
`);

const fileReader = await Deno.open("dist/dict.tsv");
remoteDB.query("begin");
for await (const line of readLines(fileReader)) {
  const [lemma, siminyms] = line.split("\t");
  insertCollocation.execute([lemma, siminyms]);
}
remoteDB.query("commit");
remoteDB.query(`
  CREATE INDEX IF NOT EXISTS siminyms_index ON siminyms(lemma)
`);
