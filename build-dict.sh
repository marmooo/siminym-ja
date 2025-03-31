rye run python reduce.py $1
rye run python -m pymagnitude.converter \
  -i cc.ja.300-small.vec \
  -o cc.ja.300-small.magnitude
rye run python similars.py
