import { readLines } from "https://deno.land/std/io/mod.ts";

async function loadInappropriateWordsJa() {
  const dict = {};
  const fileReader = await Deno.open("inappropriate-words-ja/Sexual.txt");
  for await (const word of readLines(fileReader)) {
    if (!word) continue;
    if (!["イク", "催眠"].includes(word)) {
      dict[word] = true;
    }
  }
  dict["性病"] = true;
  return dict;
}

async function loadSudachiFilter() {
  const dict = {};
  const paths = [
    "SudachiDict/src/main/text/small_lex.csv",
    "SudachiDict/src/main/text/core_lex.csv",
    "SudachiDict/src/main/text/notcore_lex.csv",
  ];
  for (const path of paths) {
    const fileReader = await Deno.open(path);
    for await (const line of readLines(fileReader)) {
      if (!line) continue;
      const arr = line.split(",");
      const surface = arr[0];
      const leftId = arr[1];
      const pos1 = arr[5];
      const pos2 = arr[6];
      const form = arr[10];
      const abc = arr[14];
      if (leftId == "-1") continue;
      if (!/^[ぁ-ゖァ-ヶー\u4E00-\u9FFF々]+$/.test(surface)) continue;
      if (pos1 == "記号") continue;
      if (pos1 == "補助記号") continue;
      if (pos2 == "固有名詞") continue;
      if (abc != "A") continue;
      if (form != "*" && !form.includes("終止形-一般")) continue;
      dict[surface] = true;
    }
    fileReader.close();
  }
  return dict;
}

async function build() {
  const inappropriateWordsJa = await loadInappropriateWordsJa();
  const sudachiFilter = await loadSudachiFilter();

  const dict = {};
  const fileReader = await Deno.open(
    "nwc2010-ngrams/word/over999/1gms/1gm-0000",
  );
  for await (const line of readLines(fileReader)) {
    if (!line) continue;
    const arr = line.split(/\s/);
    const lemma = arr[0];
    if (lemma in sudachiFilter == false) continue;
    if (lemma in inappropriateWordsJa) continue;
    const count = parseInt(arr[1]);
    if (lemma in dict) {
      dict[lemma] += count;
    } else {
      dict[lemma] = count;
    }
  }
  fileReader.close();
  const arr = Object.entries(dict);
  arr.sort((a, b) => {
    if (a[1] < b[1]) return 1;
    if (a[1] > b[1]) return -1;
    return 0;
  });
  return arr;
}

const result = await build();
Deno.writeTextFile(
  "all.lst",
  result.map((x) => x.join(",")).join("\n"),
);
