import codecs
import csv
import pandas as pd
import os

# 複数ファイルのとき
filelist =os.listdir('data/data_by_country/Germany')

# 1ファイルのとき
# filelist = 'Germany-2016-12-23--2016-12-30-details.csv'

path = './data/data_by_country/Germany'

csv_file = []
datas = []

for file in filelist:
    with codecs.open(path+'/'+file, "r", encoding='utf-8',errors='ignore') as f:
        reader = csv . reader(f)
        for line in reader:
            line.pop(0)
            csv_file.append(line)
        del csv_file[0]
        for i in range(0,10):
            datas.append(csv_file[i])

df = pd.DataFrame(datas,columns=['name', 'acousticness', 'danceability', 'energy', 'instrumentalness',
                                      'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence', 'streams','country','id'])

filename = 'top10'+'-'+'Germany.csv'

df.to_csv(filename)
