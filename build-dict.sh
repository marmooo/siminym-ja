python reduce.py $1
python -m pymagnitude.converter \
  -i cc.ja.300-small.vec \
  -o cc.ja.300-small.magnitude
python similars.py
