import json
import csv
import re
from get_spotify_data import getDetails
import pandas as pd
import codecs


def get_json(csvfile):
    count = 0
    spotify_ranking = []
    # csvファイルを読み込む
    with codecs.open(csvfile, "r", encoding='utf-8',errors='ignore') as f:
        reader = csv . reader(f)
        for line in reader:
            spotify_ranking.append(line)

    datas = []
    ids = []
    # jsonを読み込む
    # with open(jsonfile, 'r', encoding='utf-8') as f:
    #     datas = json.load(f)

    # csvの最初の邪魔な2行を消す
    del spotify_ranking[:2]

    # csvから取得したidからspotify apiを使ってデータを取得し、object型にする
    for data in spotify_ranking:
        music_id = data[4][31:]
        count += 1
        if music_id not in ids:
            try:
                detail = getDetails(music_id)
                print(count, music_id)
                ids.append(music_id)
                name = data[1]
                streams = data[3]
                speechiness = detail['speechiness']
                instrumentalness = detail['instrumentalness']
                liveness = detail['liveness']
                tempo = detail['tempo']
                mode = detail['mode']
                danceability = detail['danceability']
                valence = detail['valence']
                energy = detail['energy']
                loudness = detail['loudness']
                acousticness = detail['acousticness']
                time_signature = detail['time_signature']
                detail = [name, acousticness, danceability, energy, instrumentalness,
                          liveness, loudness, mode, speechiness, tempo, time_signature, valence, streams]
                datas.append(detail)
            except Exception:
                pass

    # objectからjsonファイル作成
    df = pd.DataFrame(datas, columns=['name', 'acousticness', 'danceability', 'energy', 'instrumentalness',
                                      'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence', 'streams'])
    array = re.split('[/-]', csvfile)
    filename = array[2]+'-'+array[6]+'-'+array[7]+'-'+array[8] + \
        '--'+array[10]+'-'+array[11]+'-'+array[12][:2]+'-details.csv'
    print(filename)
    df.to_csv(filename)
