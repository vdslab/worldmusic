from get_alldata import get_json
import os

folders = os.listdir("./data/ranking")

for folder in folders:
    path = "./data/ranking/"+folder+'/'
    filelist = os.listdir(path)
    for file in filelist:
        csv_path = path+file
        print(csv_path)
        get_json(csv_path)

