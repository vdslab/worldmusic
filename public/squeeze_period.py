import os
import csv
import codecs
import re
import pandas as pd

path = './data/data_by_country/America/'
filelist = os.listdir('./data/data_by_country/America')
year_2016 = []
year_2017 = []
year_2018 = []
year_2019 = []
year_2020 = []
year_2021 = []
year_2016_name = []
year_2017_name = []
year_2018_name = []
year_2019_name = []
year_2020_name = []
year_2021_name = []

country = 'America'
yearslist = ['2016','2017','2018','2019','2020','2021']

# 年次が同じだったら繰り返し、変わったらcsvを作成して別の年次を作成する

# まず年次を取得する必要がある

for file in filelist:
    csv_file = []
    with codecs.open(path+file, "r", encoding='utf-8',errors='ignore') as f:
        reader = csv . reader(f)
        for line in reader:
            line.pop(0)
            fileyear = re.split('[/-]',file)
            if '2016' in fileyear and line[0] not in year_2016_name:
                year_2016.append(line)
                year_2016_name.append(line[0])
            elif '2017' in fileyear and line[0] not in year_2017_name:
                year_2017.append(line)
                year_2017_name.append(line[0])
            elif '2018' in fileyear and line[0] not in year_2018_name:
                year_2018.append(line)
                year_2018_name.append(line[0])
            elif '2019' in fileyear and line[0] not in year_2019_name:
                year_2019.append(line)
                year_2019_name.append(line[0])
            elif '2020' in fileyear and line[0] not in year_2020_name:
                year_2020.append(line)
                year_2020_name.append(line[0])
            elif '2021' in fileyear and line[0] not in year_2021_name:
                year_2021.append(line)
                year_2021_name.append(line[0])


years = [year_2016,year_2017,year_2018,year_2019,year_2020,year_2021]

for year in years:
    del year[0]


for year in years:
    df = pd.DataFrame(year,columns=['name', 'acousticness', 'danceability', 'energy', 'instrumentalness',
                                      'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence', 'streams'])

    filename = country+str(y)+'.csv'
    df.to_csv(filename)
    y += 1



    
    