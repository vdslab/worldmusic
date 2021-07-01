import os
import codecs
import csv
import pandas as pd

countries = ['America','Australia','Canada','England','France','Germany','Japan','Netherland']

# country = countries[8]
folder1 = '2020_top60_removed_global'
path = './data/'+folder1+'/'
filelist = os.listdir(path)

datas = []
csv_file = []

for file in filelist:
    csv_file = []
    with codecs.open(path+file, "r", encoding='utf-8',errors='ignore') as f:
        print(file)
        reader = csv . reader(f)
        for line in reader:
            line.pop(0)
            csv_file.append(line)
            # print(line)

        del csv_file[0]

        for data in csv_file:
                datas.append(data)

filename = '2020_top40_America'

df = pd.DataFrame(datas,columns=['name', 'acousticness', 'danceability', 'energy', 'instrumentalness',
                                      'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence', 'streams','country','id'])

folder2 = '2020_top60_removed_global'
df.to_csv('./data/'+folder2+'.csv')