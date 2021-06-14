import json
import csv
import re


def get_json(csvfile, jsonfile):

    spotify_ranking = []
    folder = './count_streams'
    # csvファイルを読み込む
    with open(csvfile, "r", encoding='utf-8') as f:
        reader = csv . reader(f)
        for line in reader:
            spotify_ranking.append(line)

    datas = []
    date = re.split('[/.]', csvfile)[4][19:]
    ranking = {}

    # print(spotify_ranking)
    # jsonを読み込む
    # with open(jsonfile,'r',encoding='utf-8') as f:
    #     ranking = json.load(f)

    # csvの最初の邪魔な2行を消す
    del spotify_ranking[0]

    # print(spotify_ranking)
    # for item in spotify_ranking:
    #     print(item)

    # csvから取得したidからspotify apiを使ってデータを取得し、object型にする
    for item in spotify_ranking:
        data = {
            'name': item[1],
            'acousticness': float(item[2]),
            'danceability': float(item[3]),
            'energy': float(item[4]),
            'instrumentalness': float(item[5]),
            'liveness': float(item[6]),
            'loudness': float(item[7]),
            'mode': int(item[8]),
            'speechiness': float(item[9]),
            'tempo': float(item[10]),
            'time_signature': int(item[11]),
            'valence': float(item[12]),
            'streams': int(item[13]),
            'country': item[14],
            'id': item[15],
        }
        datas.append(data)

    # ranking[date] = datas

    # objectからjsonファイル作成
    with open(jsonfile, 'w', encoding='utf-8') as f:
        json.dump(datas, f, ensure_ascii=False,
                  indent=4, separators=(',', ': '))
