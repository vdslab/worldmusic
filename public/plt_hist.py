# 数値計算に用いるライブラリ
import math
import numpy as np
import pandas as pd
# グラフを描画するライブラリ
from matplotlib import pyplot as plt
import seaborn as sns; sns.set() # sns.set() ==> グラフの見た目をseabornに合わせる
# %matplotlib inline
country = 'America'
df = pd.read_csv("./data/2020_top60/"+country+"2020_top60.csv")
del df["name"], df["id"], df["Unnamed: 0"], df["country"]# 今回使わない列データは削除する
#df.dtypes

df['acousticness'] = pd.to_numeric(df['acousticness'],errors = 'coerce')
df['danceability'] = pd.to_numeric(df['danceability'],errors = 'coerce')
df['energy'] = pd.to_numeric(df['energy'],errors = 'coerce')
df['instrumentalness'] = pd.to_numeric(df['instrumentalness'],errors = 'coerce')
df['tempo'] = pd.to_numeric(df['tempo'],errors = 'coerce')
df['time_signature'] = pd.to_numeric(df['time_signature'],errors = 'coerce')
df['valence'] = pd.to_numeric(df['valence'],errors = 'coerce')
df['streams'] = pd.to_numeric(df['streams'],errors = 'coerce')
df['liveness'] = pd.to_numeric(df['liveness'],errors = 'coerce')
df['loudness'] = pd.to_numeric(df['loudness'],errors = 'coerce')
df['mode'] = pd.to_numeric(df['mode'],errors = 'coerce')
df['speechiness'] = pd.to_numeric(df['speechiness'],errors = 'coerce')


print(df.describe())
sturges = lambda n: math.ceil(math.log2(n*2))
b = sturges(len(df["valence"]))
from pylab import rcParams
rcParams['figure.figsize'] = 10, 10 # グラフが見きれないようにするためサイズを大きくしておく
df.hist(bins = b); # 一括でヒストグラムを描画する
# plt.tight_layout() # グラフ同士が重ならないようにする関数
# plt.show()
plt.savefig('../../music-analyze-test/feature/2020'+country+'_top60')