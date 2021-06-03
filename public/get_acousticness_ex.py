import os
import codecs
import csv
import pandas as pd

filelist = os.listdir('./data/ex_dataset/')

datas = []
csv_file = []

for file in filelist:
    filepath = './data/ex_dataset/'+file
    with codecs.open(filepath, "r", encoding='utf-8',errors='ignore') as f:
        reader = csv . reader(f)
        country = file.split('-')[0]
        for line in reader:
            line.append(country)
            csv_file.append(line)

for data in csv_file:
    name = data[1]
    acousticness = data[2]
    danceability = data[3]
    energy = data[4]
    instrumentalness = data[5]
    liveness = data[6]
    loudness = data[7]
    mode = data[8]
    speechiness = data[9]
    tempo = data[10]
    time_signature = data[11]
    valence = data[12]
    streams = data[13]
    country = data[14]
    detail = [name, acousticness, danceability, energy, instrumentalness,
                liveness, loudness, mode, speechiness, tempo, time_signature, valence, streams,country]
            
    datas.append(detail)
    
filename = 'ex.csv'

del datas[0]


df = pd.DataFrame(datas,columns=['name', 'acousticness', 'danceability', 'energy', 'instrumentalness',
                                      'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence', 'streams','country'])

df.to_csv(filename)


