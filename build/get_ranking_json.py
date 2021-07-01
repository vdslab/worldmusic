import json
import csv
from create_ranking_json import get_json
import os

# filelist = os.listdir('./count_streams')
filelist = ["America2016.csv"]


for file in filelist:
    csv_path = './count_streams/'+file
    # print(file)
    filename = file[:-4]
    print(filename)
    get_json(csv_path,'./'+filename+'.json')
