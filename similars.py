from pymagnitude import Magnitude


def getSiminyms(fout, word):
    if word in vectors:
        similars = vectors.most_similar(word)
        siminyms = list(map(lambda x: list(x), similars))
        json = str(siminyms).replace("'", '"').replace(" ", "")
        content = word + "\t" + json + "\n"
        fout.write(content)


vectors = Magnitude("cc.ja.300-small.magnitude")
words = []
with open("words.lst") as f:
    for line in f:
        words.append(line.rstrip())
with open("siminyms.tsv", "w") as fout:
    for word in words:
        getSiminyms(fout, word)
