from get_spotify_data import getDetails
import codecs
import csv
import pandas as pd
import os
import re

ids = []

country = 'Australia'
path = './data/ranking/NL/'
# filelist = os.listdir(path)
filelist = ['regional-nl-weekly-2019-11-01--2019-11-08.csv']


for file in filelist:  
    datas = []
    cnt = 0
    print(file)
    csv_data = []
    with codecs.open(path+file, "r", encoding='utf-8',errors='ignore') as f:
        reader = list(csv . reader(f))
        for line in reader:
            line.pop(0)
            csv_data.append(line)

    del csv_data[0]
    del csv_data[0]

    n = re.split('[/-]',file)
    filename = './data/data_by_country/NL/'+country+'-'+n[3]+'-'+n[4]+'-'+n[5]+'--'+n[7]+'-'+n[8]+'-'+n[9][:-4]+'-'+'details.csv'
    print(filename)

    for data in csv_data:
        
        spotify_data = getDetails(data[3][31:])
        # print(spotify_data)
        name = data[0]
        print(cnt,name)
        acousticness = spotify_data['acousticness']
        danceability = spotify_data['danceability']
        energy = spotify_data['energy']
        instrumentalness = spotify_data['instrumentalness']
        liveness = spotify_data['liveness']
        loudness = spotify_data['loudness']
        mode = spotify_data['mode']
        speechiness = spotify_data['speechiness']
        tempo = spotify_data['tempo']
        time_signature = spotify_data['time_signature']
        valence = spotify_data['valence']
        streams = data[2]
        music_id = data[3][31:]

        datas.append([name,acousticness,danceability,energy,instrumentalness,liveness,loudness,mode,speechiness,tempo,time_signature,valence,streams,country,music_id])
        cnt += 1
    df = pd.DataFrame(datas,columns=['name','acousticness','danceability','energy','instrumentalness','liveness','loudness','mode','speechiness','tempo','time_signature','valence','streams','country','id'])
    print(filename)
    df.to_csv(filename)

# ids.pop(0)
# ids = list(set(ids))
# ids.sort()
# index = 15834
# cnt = 15834

# ids.pop(0)

# for i in ids[index:]:
#     print(cnt,i)
#     cnt += 1
#     data = getDetails(i)
#     datas = [[data['album']['artists'][0]['name'],data['album']['artists'][0]['id'],i]]
#     df = pd.DataFrame(datas,columns=['name','ArtistID','MusicId'])
#     filename = 'ids.csv'
#     df.to_csv(filename,mode='a',header=False)


