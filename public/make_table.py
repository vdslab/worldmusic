import sqlite3
#make database file or access
dbname = 'database.db'
conn = sqlite3.connect(dbname)
#make cursor obj
cur = conn.cursor()

#valid foreign key
cur.execute("PRAGMA foreign_keys = ON")
#make table
cur.execute("SELECT * FROM sqlite_master WHERE type='table' and name='Artist'")
if not cur.fetchone():
    cur.execute(
        'CREATE TABLE Artist(artist STRING, artistid STRING primary key)'
    )
cur.execute("SELECT * FROM sqlite_master WHERE type='table' and name='MusicArtistId'")
if not cur.fetchone():
    cur.execute(
        'CREATE TABLE MusicArtistId(artistid STRING, musicid STRING, primary key(artistid, musicid), foreign key(artistid) references Artist(artistid))'
    )
cur.execute("SELECT * FROM sqlite_master WHERE type='table' and name='Country'")
if not cur.fetchone():
    cur.execute(
        'CREATE TABLE Country(countryid STRING primary key, country STRING)'
    )
cur.execute("SELECT * FROM sqlite_master WHERE type='table' and name='Music'")
if not cur.fetchone():
    cur.execute(
        'CREATE TABLE Music(musicid STRING primary key, name STRING, acousticness REAL, danceability REAL, energy REAL, instrumentalness REAL, liveness REAL, loudness REAL, mode INTEGER, speechiness REAL, tempo REAL, time_signature INTEGER, valence REAL, stream INTEGER, foreign key(musicid) references MusicArtistId(musicid))'
    )
cur.execute("SELECT * FROM sqlite_master WHERE type='table' and name='Ranking'")
if not cur.fetchone():
    cur.execute(
        'CREATE TABLE Ranking(startday STRING, countryid STRING, musicid STRING, position INTEGER, stream INTEGER, primary key(startday, countryid, position), foreign key(countryid) references Country(countryid), foreign key(musicid) references Music(musicid))'
    )

#print data
# print(cur.execute("SELECT * FROM Artist"))
# #print(cur.execute("SELECT TYPEOF(artist), TYPEOF(artistid) FROM Artist"))
# print(cur.fetchall())

# print(cur.execute("SELECT * FROM Country"))
# #print(cur.execute("SELECT countryid, TYPEOF(countryid), country, TYPEOF(country) FROM Country"))
# print(cur.fetchall())

print(cur.execute("SELECT * FROM MusicArtistId"))
# print(cur.execute("SELECT TYPEOF(artistid), TYPEOF(musicid) FROM MusicArtistId"))
print(cur.fetchall())

# print(cur.execute("SELECT * FROM Music"))
# #print(cur.execute("SELECT TYPEOF(musicid), TYPEOF(name), TYPEOF(acousticness), TYPEOF(danceability), TYPEOF(energy), TYPEOF(instrumentalness), TYPEOF(liveness), TYPEOF(loudness), TYPEOF(mode), TYPEOF(speechiness), TYPEOF(tempo), TYPEOF(time_signature), TYPEOF(valence), TYPEOF(stream) FROM Music"))
# print(cur.fetchall())

# print(cur.execute("SELECT * FROM Ranking"))
# print(cur.execute("SELECT TYPEOF(startday), TYPEOF(countryid), TYPEOF(musicid), TYPEOF(position), TYPEOF(stream) FROM Ranking"))
# print(cur.fetchall())

#print tables(type,name,tbl_name,rootpage,sql)
# print("---print tables---")
# cur.execute("select * from sqlite_master where type='table'")
# for row in cur.fetchall():
#     print(row)
# print("------------------")

#reflect a change
conn.commit()
#close connection
conn.close()