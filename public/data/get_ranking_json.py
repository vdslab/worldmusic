import json
import csv
from create_ranking_json import get_json
import os

filelist = os.listdir('./files/Japan')


for file in filelist:
    csv_path = './files/Japan/'+file
    print(file)
    get_json(csv_path, './ranking_jp.json')
