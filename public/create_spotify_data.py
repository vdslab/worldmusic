from get_spotify_data import getDetails
import codecs
import csv
import pandas as pd

datas = []
ids = []

with codecs.open('./Music.csv', "r", encoding='utf-8',errors='ignore') as f:
    reader = csv . reader(f)
    for line in reader:
        ids.append(line[1])

ids.pop(0)
ids = list(set(ids))
ids.sort()
index = 15834
cnt = 15834

ids.pop(0)

for i in ids[index:]:
    print(cnt,i)
    cnt += 1
    data = getDetails(i)
    datas = [[data['album']['artists'][0]['name'],data['album']['artists'][0]['id'],i]]
    df = pd.DataFrame(datas,columns=['name','ArtistID','MusicId'])
    filename = 'ids.csv'
    df.to_csv(filename,mode='a',header=False)


