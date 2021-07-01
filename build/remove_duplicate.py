import os
import pandas as pd
import csv
import codecs

path = './'
file = 'America2016.csv'

ids = []
datas = []

with codecs.open(path+file, "r", encoding='utf-8',errors='ignore') as f:
        reader = csv . reader(f)
        for line in reader:
            if line[15] not in ids:
                line.pop(0)
                ids.append(line[14])
                datas.append(line)

del datas[0]
df = pd.DataFrame(datas,columns=['name', 'acousticness', 'danceability', 'energy', 'instrumentalness',
                                      'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence', 'streams','country','id'])

filename = "remove_duplicate.csv"
df.to_csv(filename)
