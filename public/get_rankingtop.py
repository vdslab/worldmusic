import codecs
import csv
import pandas as pd

folder = './data/data_by_country/America/'
file = 'America-2016-12-23--2016-12-30-details.csv'

s = 0
f = 15

csv_file = []
datas = []

with codecs.open(folder+file, "r", encoding='utf-8',errors='ignore') as f:
        reader = csv . reader(f)
        for line in reader:
            line.pop(0)
            csv_file.append(line)

del csv_file[0]
for i in range(0,15):
    datas.append(csv_file[i])

df = pd.DataFrame(datas,columns=['name', 'acousticness', 'danceability', 'energy', 'instrumentalness',
                                      'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence', 'streams'])
    

filename = 'top'+'-'+file

df.to_csv(filename)
