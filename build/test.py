import codecs
import csv
import pandas as pd

datas = []

with codecs.open('./data/MusicArtistID.csv', "r", encoding='utf-8',errors='ignore') as f:
    reader = csv . reader(f)
    for line in reader:
        # line.pop(1)
        # line.pop(0)
        datas.append(line)
    
remove_duplicate = []



# for data in datas:
#     print(data)
# arr = list(map(list, set(map(tuple, datas))))

# print(len(arr))
# print(len(datas))

# def get_unique_list(seq):
#     seen = []
#     return [x for x in seq if x not in seen and not seen.append(x)]

def get_duplicate_list_order(seq):
    seen = []
    return [x for x in seq if seq.count(x) > 1 and not seen.append(x) and seen.count(x) == 1]

print(get_duplicate_list_order(datas))
# print(len(get_unique_list(datas)))

cnt = 0
cnt1 = 0
cnt2 = 0

# del datas[0]
# for i in datas:
#     if i[1] == '1Cs0zKBU1kc0i8ypK3B9ai' and i[2] == '4Tvw0lweq9l2JPQKFbpbBQ':
#         if cnt1 == 0:
#             print(cnt,1)
#             cnt1 += 1
#         else:
#             remove_duplicate.append(i)     
#         print(cnt,1)  
#     elif i[1] == '6pdcQa7by8IKuoVXvgknlI' and i[2] == '4YpVlqsbsnmRFP7bamdWbR':
#         if cnt2 == 0:
#             print(cnt,2)
#             cnt2 += 1
#         else:
#             remove_duplicate.append(i) 
#         print(cnt,2)
#     else:
#         remove_duplicate.append(i)
    
#     cnt += 1

# # print(len(remove_duplicate))
# # print(len(datas))

# df = pd.DataFrame(remove_duplicate,columns=['ArtistID','MusicId'])
# filename = './data/MusicArtistID.csv'
# df.to_csv(filename)