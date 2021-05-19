import json
import csv

result = []
with open("a3.csv", "r") as f:
    reader = csv . reader(f)
    for line in reader:
        result.append(line)

rankings = []
tracks = []
artists = []
streams = []
ids = []

print(result)

for i in range(2, len(result)):
    rankings.append(result[i][0])
    tracks.append(result[i][1])
    artists.append(result[i][2])
    streams.append(result[i][3])
    ids.append(result[i][4][31:])

with open('aa3.csv', 'w') as csv_file:
    fieldnames = ['ranking', 'track', 'artist', 'stream', 'id']
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

    writer.writeheader()

    for i in range(len(ids)):
        writer.writerow({'ranking': rankings[i], 'track': tracks[i], 'artist': artists[i], 'stream': streams[i], 'id': ids[i]})
