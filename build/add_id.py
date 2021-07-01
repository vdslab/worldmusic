import codecs
import os
import csv
import pandas as pd

country = 'Japan'

details_list = os.listdir('./data/data_by_country/'+country)
rank_list = os.listdir('./data/ranking/'+country)


cnt = 0
for (ranks,details) in zip(rank_list,details_list):
    datas = []
    ranking = []
    detail_list = []
    with codecs.open('./data/ranking/'+country+'/'+ranks, "r", encoding='utf-8',errors='ignore') as r:
        rank_file = csv . reader(r)
        for line in rank_file:
            ranking.append(line)
        del ranking[0]

    with codecs.open('./data/data_by_country/'+country+'/'+details, "r", encoding='utf-8',errors='ignore') as e:
         details_file = csv . reader(e)
         for line in details_file:
            line.pop(0)
            detail_list.append(line)
    
    for (rank,detail) in zip(ranking,detail_list):
        detail.append(country)
        detail.append(rank[4][31:])
        datas.append(detail)
    
    del datas[0]
    df = pd.DataFrame(datas,columns=['name', 'acousticness', 'danceability', 'energy', 'instrumentalness',
                                      'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence', 'streams','country','id'])
                                      
    df.to_csv('./'+country+'/'+details)

    
    
    
    
