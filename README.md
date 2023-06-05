# Siminym-ja

[類似度の高い基本語彙をまとめた辞書](https://marmooo.github.io/siminym-ja/)です。

## Requirements

- [rye](https://github.com/mitsuhiko/rye)
- `sudo apt install clang` for [spotify/annoy](https://github.com/spotify/annoy)

## Installation

- install [N-gram corpus](http://www.s-yata.jp/corpus/nwc2010/ngrams/) (free)
- install [SudachiDict](https://github.com/WorksApplications/SudachiDict)
  licenced under the Apache-2.0
- install
  [MosasoM/inappropriate-words-ja](https://github.com/MosasoM/inappropriate-words-ja)
  licensed under the MIT
- install
  [cc.ja.300.vec.gz](https://dl.fbaipublicfiles.com/fasttext/vectors-crawl/cc.ja.300.vec.gz)
  from [fastText](https://fasttext.cc/docs/en/crawl-vectors.html) licensed under
  the [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)
- `npm install`
- `rye sync`

## Build

```
bash build-dict.sh
bash build-db.sh
bash build.sh
```

## Related projects

- [Siminym-en](https://github.com/marmooo/siminym-en) (English)
- [Siminym-zh](https://github.com/marmooo/siminym-zh) (Chinese)

## License

CC BY-SA 4.0
