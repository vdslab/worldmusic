import pandas as pd

name = "Music"
df = pd.read_csv("./data/"+name+".csv")
print(df.columns)
df = df.drop(columns='Unnamed: 0')
#print(df)
df.to_csv('./data/'+name+'2.csv',index=False,header=False)