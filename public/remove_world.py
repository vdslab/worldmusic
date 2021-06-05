import csv
import codecs
import pandas as pd

global_musicname = []
country_data = []
removed_data = []
count = 1

global_file = './data/data_by_country/global/Global-2016-12-30--2017-01-06-details.csv'
country_file = './data/data_by_country/America/America-2016-12-23--2016-12-30-details.csv'

with codecs.open(global_file, "r", encoding='utf-8',errors='ignore') as f:
        reader = csv . reader(f)
        for line in reader:
            global_musicname.append(line[1])

with codecs.open(country_file, "r", encoding='utf-8',errors='ignore') as f:
        reader = csv . reader(f)
        for line in reader:
            country_data.append(line)
            

for data in country_data:
    if data[1] not in global_musicname:
        data.pop(0)
        count += 1
        removed_data.append(data)

df = pd.DataFrame(removed_data,columns=['name', 'acousticness', 'danceability', 'energy', 'instrumentalness',
                                      'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence', 'streams'])

file = country_file.split('/')[4]     

filename = 'removed-'+file

df.to_csv(filename)