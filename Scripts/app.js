import { GetUserBudget, saveUserBudget, saveUserExpenses, removeUserExpense } from "./LocalStorage.js"

const userBudget = document.getElementById("userBudget")
const userBudgetInput = document.getElementById("userBudgetInput")
const expensesContainer = document.getElementById("expensesContainer")
const userExpenseName = document.getElementById("userExpenseName")
const userExpenseValue = document.getElementById("userExpenseValue")
const expenseBtn = document.getElementById("expenseBtn")
const moneyLeft = document.getElementById("moneyLeft")

const budgetWarning = document.getElementById("budgetWarning")


function displayBudget(){

let data = GetUserBudget()
userBudget.innerText = `${data.Budget}$`

}

function setUserBudget(input){

    if (!isNaN(input)) 
    {
        budgetWarning.innerText = ''  
        saveUserBudget(Number(input))  
    }
    else
    {
        budgetWarning.innerText = "Numbers Only"
    }


}

function expenseDisplay(){
    let data = GetUserBudget()
    let ExpenseArr = data.Expenses

    expensesContainer.innerHTML = "";

    for (let object of ExpenseArr)
    {
        const expenseDiv = document.createElement('div')
        const expenseName = document.createElement('p')
        const expenseValue = document.createElement('p')
        const expenseRemoveBtn = document.createElement('p')

        expenseName.innerText = object.ExpenseName
        expenseValue.innerText = object.ExpenseValue
        expenseRemoveBtn.innerText = "X"

        expenseDiv.classList.add("bg-amber-100", "flex", "w-[95%]", "h-[80px]", "justify-between", "border-2", "rounded-[5px]")
        expenseName.classList.add("text-14", "text-black", "m-0", "self-center", "h-full")
        expenseValue.classList.add("text-14", "text-red-500", "m-0", "self-center", "h-full")
        expenseRemoveBtn.classList.add("text-14", "border-2", "p-1", "self-center", "h-full", "text-red-700")

        expenseRemoveBtn.addEventListener('click', () => {
            removeUserExpense(object.ExpenseName)
            expenseDiv.remove()

        })


        expensesContainer.appendChild(expenseDiv)
        expenseDiv.appendChild(expenseName)
        expenseDiv.appendChild(expenseValue)
        expenseDiv.appendChild(expenseRemoveBtn)


    }

}