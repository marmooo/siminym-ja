# deno run --allow-read --allow-write reduce.js
python reduce.py
python -m pymagnitude.converter \
  -i cc.ja.300-small.vec \
  -o cc.ja.300-small.magnitude
python similars.py
