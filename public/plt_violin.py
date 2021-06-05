import pandas as pd
import seaborn
import matplotlib.pyplot as plt

# csvfile = './data/ex_dataset/America-2021-04-16--2021-04-23-details.csv'
csvfile = './ex.csv'
df = pd.read_csv(csvfile,sep=",",index_col=0)
df.columns=['name', 'acousticness', 'danceability', 'energy', 'instrumentalness',
                                      'liveness', 'loudness', 'mode', 'speechiness', 'tempo', 'time_signature', 'valence', 'streams','country']

df['acousticness'] = pd.to_numeric(df['acousticness'],errors = 'coerce')
df['danceability'] = pd.to_numeric(df['danceability'],errors = 'coerce')
df['energy'] = pd.to_numeric(df['energy'],errors = 'coerce')
df['instrumentalness'] = pd.to_numeric(df['instrumentalness'],errors = 'coerce')
df['tempo'] = pd.to_numeric(df['tempo'],errors = 'coerce')
df['time_signature'] = pd.to_numeric(df['time_signature'],errors = 'coerce')
df['valence'] = pd.to_numeric(df['valence'],errors = 'coerce')
df['streams'] = pd.to_numeric(df['streams'],errors = 'coerce')

seaborn.violinplot(x = df['country'],y = df['valence'],inner="quartile")
plt.show()
