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

country = 'America'
yearslist = ['2016','2017','2018','2019','2020','2021']
y = 2016


# 年次が同じだったら繰り返し、変わったらcsvを作成して別の年次を作成する

# まず年次を取得する必要がある

for file in filelist:
    csv_file = []
    with codecs.open(path+file, "r", encoding='utf-8',errors='ignore') as f:
        reader = csv . reader(f)
        for line in reader:
            line.pop(0)
            fileyear = re.split('[/-]',file)
            if '2016' in fileyear:
                year_2016.append(line)
            elif '2017' in fileyear:
                year_2017.append(line)
            elif '2018' in fileyear:
                year_2018.append(line)
            elif '2019' in fileyear:
                year_2019.append(line)
            elif '2020' in fileyear:
                year_2020.append(line)
            else:
                year_2021.append(line)
            

    

years = [year_2016,year_2017,year_2018,year_2019,year_2020,year_2021]

for data in years:
    del data[0]

for year in years:
    
    df = pd.DataFrame(year,columns=['name', 'acousticness', 'danceability', 'energy', 'instrumentalness',
                                      'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence', 'streams','country','id'])

    filename = country+str(y)+'.csv'
    df.to_csv(filename)
    y += 1



    
    