import os
import pandas as pd
import csv
import codecs


ids = []
datas = []
csv_data = []

country = "Netherland"
year = '2021'

country_file = './data/data_by_year/'+country+'/'+country+year+'.csv'


with codecs.open(country_file, "r", encoding='utf-8',errors='ignore') as f:
    reader = csv . reader(f)
    for line in reader:
        line.pop(0)
        if line[12] != 'streams':
            csv_data.append(line)
    


# with codecs.open(country_file, "r", encoding='utf-8',errors='ignore') as f:
#     reader = csv . reader(f)
#     for line in reader:
#         line.pop(0)
#         csv_data.append(line)

del csv_data[0]

for data in csv_data:
    data[12] = int(data[12])
    if data[14] not in ids:
        ids.append(data[14])
        datas.append(data)
    else:
        index = ids.index(data[14])
        datas[index][12] += data[12]

df = pd.DataFrame(datas,columns=['name', 'acousticness', 'danceability', 'energy', 'instrumentalness',
                                      'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence', 'streams','country','id'])

filename = country+year
df.to_csv('./data/'+filename+'.csv')