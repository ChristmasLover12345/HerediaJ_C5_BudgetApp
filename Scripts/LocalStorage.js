


function GetUserBudget(){
    let userData = localStorage.getItem('BudgetData')
    if (userData == null)
    {
        return []
    }
    return JSON.parse(userData)
}

function saveUserBudget(userData){


    
}