import sqlite3
#make database.db or access
dbname = 'test.db'
conn = sqlite3.connect(dbname)
#make cursor obj
cur = conn.cursor()

#valid foreign key
cur.execute("PRAGMA foreign_keys = ON")
#make table
cur.execute("SELECT * FROM sqlite_master WHERE type='table' and name='students'")
if not cur.fetchone():
    cur.execute('CREATE TABLE students(id int primary key, name str)')
cur.execute("SELECT * FROM sqlite_master WHERE type='table' and name='memo'")
if not cur.fetchone():
    cur.execute('CREATE TABLE memo(id int primary key, age int, writer_id int,foreign key(writer_id) references students(id))')

#print data
select_s = "SELECT * FROM students"
print(cur.execute(select_s))
print(cur.fetchall())
select_m = "SELECT * FROM memo"
print(cur.execute(select_m))
print(cur.fetchall())

#delete table
#cur.execute("drop table memo")
#cur.execute("drop table students")

#print tables(type,name,tbl_name,rootpage,sql)
print("---print tables---")
cur.execute("select * from sqlite_master where type='table'")
for row in cur.fetchall():
    print(row)
print("------------------")

#reflect a change
conn.commit()
#close connection
conn.close()