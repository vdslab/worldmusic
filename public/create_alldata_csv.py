from get_alldata import get_json
import os

folders = os.listdir("./data/ranking/AU")
# for file in folders:
#     csv_path = "./data/ranking/AU/"+file
#     print(csv_path)
get_json("./data/ranking/GL/regional-global-weekly-2016-12-23--2016-12-30.csv")

