import { GetUserBudget, saveUserBudget, saveUserExpenses, removeUserExpense } from "./LocalStorage.js"

const userBudget = document.getElementById("userBudget")
const userBudgetInput = document.getElementById("userBudgetInput")
const expensesContainer = document.getElementById("expensesContainer")
const userExpenseName = document.getElementById("userExpenseName")
const userExpenseValue = document.getElementById("userExpenseValue")
const expenseBtn = document.getElementById("expenseBtn")
const moneyLeft = document.getElementById("moneyLeft")

const budgetWarning = document.getElementById("budgetWarning")
const expenseNameWarning = document.getElementById("expenseNameWarning")
const expenseValueWarning = document.getElementById("expenseValueWarning")


let expenseNameBool = false
let expenseValueBool = false

// display user budget
function displayBudget(){

let data = GetUserBudget()
userBudget.innerText = `$${data.Budget.toFixed(2)}`

}
// save user budget
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

// Display expenses
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

// subtract the expenses
function moneyCalculator(){

let data = GetUserBudget()
let money = data.Budget

for (let coin of data.Expenses)
{

    money -= coin.ExpenseValue

}

moneyLeft.innerText = `$${money.toFixed(2)}`

}

// Add an expense
function setExpenses(name, value)
{
    if (isNaN(name)) 
        {
            expenseNameWarning.innerText = ''  
            expenseNameBool = true
             
        }
        else
        {
            expenseNameWarning.innerText = "words Only"
            expenseNameBool = false
        }

    if (!isNaN(Number(value)))
    {
        expenseValueWarning.innerText = ''
        expenseValueBool = true
    }
    else
    {
        expenseValueWarning.innerText = "numbers Only"
        expenseValueBool = false
    }

    if (expenseNameBool && expenseValueBool)
    {
        saveUserExpenses(name, Number(value)) 
        expenseDisplay()
        moneyCalculator()
       
    }
        
}

// event listener for adding an expense
expenseBtn.addEventListener('click', () => {

if (userExpenseName.value != "" && userExpenseValue.value != "")
{
    setExpenses(userExpenseName.value, userExpenseValue.value)

}


})

userBudgetInput.addEventListener('keydown', (e) => {

    if(e.key === 'Enter')
    {
        if ( userBudgetInput.value != "")
        {
            setUserBudget(userBudgetInput.value)
            displayBudget()
        }
    }

})