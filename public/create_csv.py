import csv
import pandas as pd
import codecs
import os
import numpy as np
from get_spotify_data import getDetails
from get_spotify_data import getFeatures


##Ranking.csvをつくる

# path = './data/ranking/'
# folderlist = os.listdir(path)

# datas = []
# filename = './data/Ranking.csv'
# for folder in folderlist:
#     filelist = os.listdir(path+folder)
#     for file in filelist:
#         name = file.split('-')
#         startDay = name[3]+'-'+name[4]+'-'+name[5]
#         cnt = 0
#         with codecs.open(path+folder+'/'+file, "r", encoding='utf-8',errors='ignore') as f:
#             reader = list(csv . reader(f))
#             for line in reader:
#                 if cnt >= 2:
#                     data = [startDay,folder,line[4][31:],line[0],line[3]]
#                     datas.append(data)
#                 else:
#                     cnt += 1

# df = pd.DataFrame(datas,columns=['startDay','CountryID','MusicID','Position','length'])

# #Music.csvを作る

# path = './data/Ranking.csv'
# folderlist = os.listdir(path)

# datas = []
# ids = []
# filename = './data/Music.csv'



# cnt = 0
# with codecs.open(path, "r", encoding='utf-8',errors='ignore') as f:
#     reader = csv . reader(f)
#     for line in reader:
#         if cnt >= 1:
#             ids.append(line[3])
#         else:          
#             cnt += 1    

# ids = list(set(ids))
# ids.sort()

# ids.pop(0)

# ids = ['4LkEHc33eXcXFQNwxruw7W']

# artist_music = []

# def detail(i):
#     detail_data = getDetails(i)
#     if detail_data == {'error': {'status': 400, 'message': 'invalid request'}} or detail_data == {"error": {"status": 401,"message": "The access token expired"}} or detail_data =={"error": {"status": 404,"message": "analysis not found"}}:
#         print('error',i)
#     else:
#         print(detail_data)
#         artist_name = detail_data['album']['artists'][0]['name']
#         artist_id = detail_data['album']['artists'][0]['id']
#         music_name = detail_data['album']['name']
#         return [artist_name,artist_id,i,music_name]


# def feature(i,music_name):
#     feature_data = getFeatures(i)
#     if feature_data == {'error': {'status': 400, 'message': 'invalid request'}} or feature_data == {"error": {"status": 401,"message": "The access token expired"}} or feature_data =={"error": {"status": 404,"message": "analysis not found"}}:
#         print('error',i)
#     else:
#         print(feature_data)
#         acousticness = feature_data['acousticness']
#         danceability =feature_data['danceability']
#         energy = feature_data['energy']
#         instrumentalness = feature_data['instrumentalness']
#         liveness = feature_data['liveness']
#         loudness = feature_data['loudness']
#         mode = feature_data['mode']
#         speechiness = feature_data['speechiness']
#         tempo = feature_data['tempo']
#         time_signature = feature_data['time_signature']
#         valence = feature_data['valence']
    
#         return [i,music_name,acousticness,danceability,energy,instrumentalness,liveness,loudness,mode,speechiness,tempo,time_signature,valence,]

# cnt = 17445
# index = 17445


# for i in ids[index:]:
#     print(cnt,i)
#     data = detail(i)
#     datas = [feature(i,data[3])]
#     artist_music = [data[:3]]
#     if len(datas) == 13 and len(artist_music) == 3:
#         df_features = pd.DataFrame(datas,columns=['MusicID','MusicName','Acousticness','Danceability','Energy','Instrumentalness','Liveness','Loudness','Mode','Speechiness','Tempo','Time_Signeture','Valence'])
#         df_details = pd.DataFrame(artist_music,columns=['ArtistName','ArtistID','MusicID'])
#         df_features.to_csv('./data/Music.csv',mode='a',header=False)
#         df_details.to_csv('./data/ids.csv',mode='a',header=False)
#     cnt += 1

# cnt = 0
# for i in ids:
#     if i == '0bg9us6qbMWTAMSF3y4egO':
#         print(cnt)

#     cnt += 1
# dup = [x for x in set(ids) if ids.count(x) > 1]
# print(dup)

#

# ##新しく追加したcsvの曲がidsに含まれているか確認し、含まれていない場合追加する

# path = './data/data_by_country/AU/'
# filelist = os.listdir(path)

# filename = './data/ids.csv'

# ids = []
# datas = []
# with codecs.open('./data/ids.csv', "r", encoding='utf-8',errors='ignore') as f:
#     reader = csv . reader(f)
#     for line in reader:
#         line.pop(0)
#         if line[2] not in ids:
#             datas.append(line)
#             ids.append(line[2])
        
# print(len(ids))
# print(len(set(ids)))
        

# for file in filelist:
#     cnt = 0
#     with codecs.open(path+file, "r", encoding='utf-8',errors='ignore') as f:
#         reader = csv . reader(f)
#         for line in reader:
#             if cnt >= 1:
#                 if line[15] not in ids:
                    # spotify_data = getDetails(line[15])
                    # name = spotify_data['album']['artists'][0]['name']
                    # artistID = spotify_data['album']['artists'][0]['id']
                    # musicID = line[15]
                    # print(spotify_data)
                    # print(name)
                    # ids.append(line[15])
                    # data = [name,artistID,musicID]
                    # datas.append(data)
#             cnt += 1
# print(len(ids))
# print(len(set(ids)))

# del datas[0]
# df = pd.DataFrame(datas,columns=['name','ArtistID','MusicID'])
# df.to_csv(filename)

# # MusicArtistID.csvを作成する

# filename = './data/MusicArtist.csv'
# datas = []

# with codecs.open('./data/ids.csv', "r", encoding='utf-8',errors='ignore') as f:
#     reader = csv . reader(f)
#     for line in reader:
#         line.pop(0)
#         datas.append([line[1],line[2]])

# del datas[0]
# df = pd.DataFrame(datas,columns=['ArtistID','MusicID'])
# df.to_csv(filename)

# # ArtistID.csvを作成する

filename = './data/Artist.csv'
ids = []
idsx = []
datas = []
with codecs.open('./data/ids.csv', "r", encoding='utf-8',errors='ignore') as f:
        reader = csv . reader(f)
        for line in reader:
            idsx.append(line[2])
            if line[2] not in ids:
                ids.append(line[2])
                datas.append([line[1],line[2]])

del datas[0]
print(len(ids))
print(len(set(idsx)))
df = pd.DataFrame(datas,columns=['ArtistName','ArtistID'])
df.to_csv(filename)

# check

# datas = []

# filename = './data/ids.csv'

# with codecs.open('./data/ids.csv', "r", encoding='utf-8',errors='ignore') as f:
#     reader = csv . reader(f)
#     for line in reader:
#         line.pop(0)
#         datas.append(line)
#         # print(line)
# del datas[0]
# df = pd.DataFrame(datas,columns=['ArtistName','ArtistID','MusicID'])
# df.to_csv(filename)


# path = './data/ranking/'
# folderlist = os.listdir(path)

# datas = []
# ids = []

# for folder in folderlist:
#     filelist = os.listdir(path+folder)
#     for file in filelist:
#         with codecs.open(path+folder+'/'+file, "r", encoding='utf-8',errors='ignore') as f:
#             reader = list(csv . reader(f))
#             reader = np.delete(reader,[0,1],0)
#             for line in reader:
#                 datas.append(line)

# for data in datas:
#     url = data[4][31:]

#     ids.append(url)

# print(len(list(set(ids))))

# idsx = list(set(ids))

# for i in datas:
#     print(i)




