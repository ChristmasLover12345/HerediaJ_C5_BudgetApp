


function GetUserBudget(){
    let userData = localStorage.getItem('BudgetData')
    if (userData == null)
    {
        let Default = {
            Budget: 2600,
            Expenses: []
        }
        return Default
    }
    return JSON.parse(userData)
}

function saveUserBudget(userBudget){

    let savedInfo = GetUserBudget()
    if (savedInfo.Budget !== userBudget)
    {
        savedInfo.Budget = userBudget
    }

    localStorage.setItem('BudgetData', JSON.stringify(savedInfo))

        console.log("Budget saced!")
}

function saveUserExpenses(name, value)
{
    let savedInfo = GetUserBudget()
    // This checks if Exspense is an array, if it is, it will return true
    if(!Array.isArray(savedInfo.Expenses))
    {
        savedInfo.Expenses = []
    }

    // .some() is going tru all of the entrires in "expenses" and checking the name, if it finds a match then it returns TRUE
    if(savedInfo.Expenses.some(expenses => expenses.ExpenseName.toLowerCase() === name.toLowerCase()))
    {
        return
    }

    savedInfo.Expenses.push({ExpenseName: name, ExpenseValue: value})

    localStorage.setItem('BudgetData', JSON.stringify(savedInfo))

    console.log("Expense added")

}


function removeUserExpense(name)
{
    let savedInfo = GetUserBudget()

                    // .findIndex is going tru all of the entries of "expenses", if it finds a match it returns the index, else it returns -1
    const index = savedInfo.Expenses.findIndex(expenses => expenses.ExpenseName.toLowerCase() === name.toLowerCase())
    
    if (index !== -1)
    {
        savedInfo.Expenses.splice(index, 1)
        localStorage.setItem('BudgetData', JSON.stringify(savedInfo))
        console.log("Expense Removed")
    }    

}

export {GetUserBudget, saveUserBudget, saveUserExpenses, removeUserExpense}