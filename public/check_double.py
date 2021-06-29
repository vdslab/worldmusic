import csv

with open('./data/Ranking2.csv') as csvfile:
    reader = csv.reader(csvfile)
    reader = [i for i in reader]
    length = range(len(reader))
    # #start = 355001-1
    # #end = 400200-1
    # #length = range(start,end)
    for l in length:
        # print(reader[l])
        row = reader[l]
        # print(row)
        l2 = range(l+1,len(reader))
        # #l2 = range(start+1,end)
        for i in l2:
            # #print("l "+str(l))
            # #print("i "+str(i))
            # print("l: "+reader[l])
            # print("i: "+reader[i])
            if reader[l] == reader[i]:
                print("same")
                print(str(l)+" and "+str(i))
        # #start += 1
