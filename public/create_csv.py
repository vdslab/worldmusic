import csv
import pandas as pd
import codecs
import os

path = './data/data_by_country/'
folderlist = os.listdir(path)

datas = []

# for folder in folderlist:
#     filelist = os.listdir(path+folder)
#     for file in filelist:
#         cnt = 1
#         with codecs.open(path+folder+'/'+file, "r", encoding='utf-8',errors='ignore') as f:
#             reader = csv . reader(f)
#             for line in reader:
#                 if cnt >= 2:
#                     data = [line[15],line[1],line[2],line[3],line[4],line[5],line[6],line[7],line[8],line[9],line[10],line[11],line[12],line[13]]
#                     datas.append(data)
#                 cnt += 1

ids = []
i = []

with codecs.open('./ids.csv', "r", encoding='utf-8',errors='ignore') as f:
    reader = csv . reader(f)
    for line in reader:
        line.pop(0)
        i.append(line[1])
        if line[1] not in ids:
            datas.append([line[0],line[1]])
            ids.append(line[1])

# # print(datas)
# # array = [['AU','Australia'],['CA','Canada'],['DE','Germany'],['FR','France'],['GL','Global'],['JP','Japan'],['NL','Netherland'],['UK','United Kingdom'],['US','United States']]

del datas[0]
# print(len(datas))
df = pd.DataFrame(datas,columns=['ArtName','ArtistId'])

filename = 'Artist.csv'

df.to_csv(filename)