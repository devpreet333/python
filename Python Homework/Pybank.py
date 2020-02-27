import os
import csv
#declaring empty list and varibles
change = []
change_var = 0
total = 0
#opening nd reading csv file
csvpath = os.path.join("pyBank.csv")
with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile)
    #convertng csv file to list
    data = list(csvreader)
    #calculating number of months
    months = len(data)
    del data[0]
    #calculating total profits and apending change in profits to new list
    for row in data:
        total += int(row[1])
        change.append(int(row[1])- change_var)
        change_var=int(row[1])

    del change[0]
    
    print("Financial Analysis:")
    print("-----------------------")
    print("total months = " + str(months - 1))
    print("Total = $" +str(total))
    print("Average Change = $" +str(sum(change)/(months - 2)))
    
    # Indexing minimum and maxmum values in change list
    a = change.index(max(change))
    b = change.index(min(change))
    
    #printing greatest and smallest values 
    print("Greatest Increase in Profits: " +str(data[a+1][0])+ " ($" +str(max(change)) + ")")
    print("Greatest Decrease in Profits: " +str(data[b+1][0])+ " ($" +str(min(change)) + ")")

    txtPath = os.path.join("pybank.txt")
    #transferring output to txt
    with open(txtPath,"w") as txtfile: 
        txtfile.writelines(f"""Financial Analysis
        -----------------------
        total months =  {str(months - 1)}
        Total = ${str(total)}
        Average Change = ${str(sum(change)/(months - 2))}
        Greatest Increase in Profits: {str(data[a+1][0])} ${str(max(change))}
        Greatest Decrease in Profits: {str(data[b+1][0])} ${str(min(change))}""")