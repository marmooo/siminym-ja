from pymagnitude import Magnitude

def getSiminyms(fout, word):
    if word in vectors:
        similars = vectors.most_similar(word)
        siminyms = list(map(lambda x: x[0], similars))
        content = word + "," + ",".join(siminyms) + "\n"
        fout.write(content)



vectors = Magnitude("cc.ja.300-small.magnitude")
words = []
with open("words.lst") as f:
    for line in f:
        word = line.split(",", 1)[0]
        words.append(word)
with open("dist/dict.csv", "w") as fout:
    for word in words:
        getSiminyms(fout, word)
