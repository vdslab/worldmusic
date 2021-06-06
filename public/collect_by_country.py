import os
import codecs
import csv
import pandas as pd

country = 'Germany'
filelist = os.listdir('./data/data_by_country/'+country)

datas = []
csv_file = []

for file in filelist:
    filepath = './data/data_by_country/'+country+'/'+file
    csv_file = []
    with codecs.open(filepath, "r", encoding='utf-8',errors='ignore') as f:
        reader = csv . reader(f)
        for line in reader:
            line.pop(0)
            csv_file.append(line)
        
        del csv_file[0]
        for data in csv_file:
            name = data[0]
            acousticness = data[1]
            danceability = data[2]
            energy = data[3]
            instrumentalness = data[4]
            liveness = data[5]
            loudness = data[6]
            mode = data[7]
            speechiness = data[8]
            tempo = data[9]
            time_signature = data[10]
            valence = data[11]
            streams = data[12]
            country = data[13]
            music_id = data[14]
            detail = [name, acousticness, danceability, energy, instrumentalness,
                liveness, loudness, mode, speechiness, tempo, time_signature, valence, streams,country,music_id]
            datas.append(detail)
    
filename = 'collect_'+country+'.csv'


df = pd.DataFrame(datas,columns=['name', 'acousticness', 'danceability', 'energy', 'instrumentalness',
                                      'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence', 'streams','country','id'])

df.to_csv('./data/ex_dataset/'+filename)


