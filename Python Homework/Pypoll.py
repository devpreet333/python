import os
import csv
from collections import Counter
#declaring empty list and varibles
count_vote = []
candidates_votes = []
#opening nd reading csv file
csvpath = os.path.join("election_data.csv")
with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile)
    #convertng csv file to list
    data = list(csvreader)
    #calculating number of votes
    del data[0]
    total_votes = len(data)
    print("Election Results")
    print("-----------------------")
    print("Total Votes = " +str(total_votes))
    print("-----------------------")
    #creating  loop to gather all the candidates in new empty list
    lastval = 0
    countval = 0
    for row in data:
        count_vote.append(row[2])
        #if row [2] != lastval:
            #if row[2] in candidates_votes:
               #lastval = row[2]    
            #else: 
                #candidates_votes.append(row[2])
        #lastval = row[2]
    #print(count_vote)
    unique_candidates = Counter(count_vote)
    b = dict(unique_candidates)
    #print(b)
    print ("Khan: " + "{:.2%}".format((b["Khan"]/total_votes)) + " (" +str(b["Khan"]) + ")" )
    print ("Correy: " + "{:.2%}".format((b["Correy"]/total_votes)) + " (" +str(b["Correy"]) + ")" )
    print ("Li: " + "{:.2%}".format((b["Li"]/total_votes)) + " (" +str(b["Li"]) + ")" )
    print ("O'Tooley: " + "{:.2%}".format((b["O'Tooley"]/total_votes)) + " (" +str(b["O'Tooley"]) + ")" )
    print("-----------------------")
    winner = max(b, key=b.get)
    print("Winner: "+ winner)

        #print(a)

    #calculating total profits and apending change in profits to new list
    #for row in data:
        #total += int(row[1])
        #change.append(int(row[1])- change_var)
        #change_var=int(row[1])

    #del change[0]
    
    #print("Financial Analysis:")
    #print("-----------------------")
    #print("total months = " + str(months - 1))
    #print("Total = $" +str(total))
    #print("Average Change = $" +str(sum(change)/(months - 2)))
    
    # Indexing minimum and maxmum values in change list
    #a = change.index(max(change))
    #b = change.index(min(change))
    
    #printing greatest and smallest values 
    #print("Greatest Increase in Profits: " +str(data[a+1][0])+ " ($" +str(max(change)) + ")")
    #print("Greatest Decrease in Profits: " +str(data[b+1][0])+ " ($" +str(min(change)) + ")")
