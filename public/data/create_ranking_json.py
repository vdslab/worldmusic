import json
import csv
import re


def get_json(csvfile, jsonfile):

    spotify_ranking = []
    # csvファイルを読み込む
    with open(csvfile, "r", encoding='utf-8') as f:
        reader = csv . reader(f)
        for line in reader:
            spotify_ranking.append(line)

    datas = []
    date = re.split('[/.]', csvfile)[4][19:]
    ranking = {}
    # jsonを読み込む
    # with open(jsonfile,'r',encoding='utf-8') as f:
    #     ranking = json.load(f)

    # csvの最初の邪魔な2行を消す
    del spotify_ranking[:2]

    # print(spotify_ranking)

    # csvから取得したidからspotify apiを使ってデータを取得し、object型にする
    for item in spotify_ranking:
        data = {
            'name': item[1],
            'ranking': item[0],
            'id': item[4][31:],
            'stream': item[3],
            'artist': item[2]
        }
        datas.append(data)

    ranking[date] = datas

    # objectからjsonファイル作成
    with open(jsonfile, 'w', encoding='utf-8') as f:
        json.dump(ranking, f, ensure_ascii=False,
                  indent=4, separators=(',', ': '))
