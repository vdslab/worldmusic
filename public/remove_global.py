import csv
import codecs
import pandas as pd
import os

global_id = []
datas = []
country = 'America'
gl = 'Global'
path = './data/data_by_country/'

# 国ごとでみる
global_filelist = os.listdir(path+gl)
country_filelist = os.listdir(path+country)
# 1ファイルのみ
# country_file = './data/data_by_country/America/America-2016-12-23--2016-12-30-details.csv'



for file in global_filelist:
    with codecs.open(path+gl+'/'+file, "r", encoding='utf-8',errors='ignore') as f:
        reader = csv . reader(f)
        for line in reader:
            if line[15] not in global_id:
                global_id.append(line[15])


# 複数ファイルのとき
for file in country_filelist:
    with codecs.open(path+country+'/'+file, "r", encoding='utf-8',errors='ignore') as f:
        reader = csv . reader(f)
        for line in reader:
            if line[15] not in global_id:
                line.pop(0)
                datas.append(line)
# 1ファイルのとき
# with codecs.open(country_file, "r", encoding='utf-8',errors='ignore') as f:
#         reader = csv . reader(f)
#         for line in reader:
#             if line[15] not in global_id:
#                 line.pop(0)
#                 datas.append(line)
            
del datas[0]
df = pd.DataFrame(datas,columns=['name', 'acousticness', 'danceability', 'energy', 'instrumentalness',
                                      'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence', 'streams','country','id'])

filename = country+'_removed_global.csv' 
df.to_csv(filename)