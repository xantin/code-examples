import re

def isValidSSN(number):
    return bool(re.match('^[0-9]{3}-[0-9]{2}-[0-9]{4}$', number))
employeeList=[]
print("Please insert SSN in this format ###-##-#### or type done for end program")
while True:
    inp = input()
    if inp == "done":
        stringTemplate="{:<30} {:<15} {:<15}"
        print(stringTemplate.format("Name","Birth Year","SSN"))
        for employee in employeeList:
            print(stringTemplate.format(employee[1]+" "+employee[0], employee[2], employee[3]))
        break
    if(isValidSSN(inp)):
        print("Last name")
        last_name = input()
        print("First name")
        first_name = input()
        print("Birth year")
        birth_year = input()
        employeeList.append([last_name,first_name,birth_year,inp])
        print("Employee inserted to list, please insert new SSN in this format ###-##-#### or type done for end program")
    else:
        print("not valid SSN number, try again or type done for end program")
