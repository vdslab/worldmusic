import json
import csv

json_list = []

with open('aa.csv', 'r') as f: 
    csv_reader = csv .DictReader(f)
    for row in csv_reader:
        json_list.append(row)


with open('aaa.json', 'w') as f: 
    json.dump(json_list, f, ensure_ascii=False,
              indent=4, separators=(',', ': '))