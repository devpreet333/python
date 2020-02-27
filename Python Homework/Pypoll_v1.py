import os
import csv
from collections import Counter
#declaring empty list and varibles
count_vote = []
#opening nd reading csv file
csvpath = os.path.join("election_data.csv")
with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile)
    #convertng csv file to list
    data = list(csvreader)
    #calculating total number of votes
    del data[0]
    total_votes = len(data)
    print("Election Results")
    print("-----------------------")
    print("Total Votes = " +str(total_votes))
    print("-----------------------")
    #creating  loop to gather all the candidates in new empty list
    for row in data:
        count_vote.append(row[2])
    #calculating repeated values in the new list abd appendng them to dictionary
    unique_candidates = Counter(count_vote)
    b = dict(unique_candidates)
    #printing required values from the new created dictionary
    print ("Khan: " + "{:.2%}".format((b["Khan"]/total_votes)) + " (" +str(b["Khan"]) + ")" )
    print ("Correy: " + "{:.2%}".format((b["Correy"]/total_votes)) + " (" +str(b["Correy"]) + ")" )
    print ("Li: " + "{:.2%}".format((b["Li"]/total_votes)) + " (" +str(b["Li"]) + ")" )
    print ("O'Tooley: " + "{:.2%}".format((b["O'Tooley"]/total_votes)) + " (" +str(b["O'Tooley"]) + ")" )
    print("-----------------------")
    #finding max value in the dictionary
    winner = max(b, key=b.get)
    print("Winner: "+ winner)
    txtPath = os.path.join("pypoll1.txt")
#transferring output to txt
with open(txtPath,"w") as txtfile: 
    txtfile.writelines(f"""Election Results
-----------------------
Total Votes = {total_votes}
-----------------------
Khan: {((b["Khan"]/total_votes))*100}% ({b["Khan"]})
Correy: {((b["Correy"]/total_votes))*100}% ({b["Correy"]})
Li: {((b["Li"]/total_votes))*100}% ({b["Li"]})
O'Tooley: {((b["O'Tooley"]/total_votes))*100}% ({b["O'Tooley"]})
-----------------------
Winner: {winner})""")

      