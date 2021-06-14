import pandas as pd
import seaborn as sns

country = 'France'
countries = ['America','Australia','Canada','England','France','Germany','Japan','Netherland']

df = pd.read_csv("./data/2020_top60_removed_global/"+country+"2020_top60_removed_global.csv", index_col=0)
del df['mode'],df['time_signature'],
pg = sns.pairplot(df)
pg.savefig('./data/'+country+'2020_top60_removed_global.png')