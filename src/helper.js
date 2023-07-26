export const waait = () => new Promise(res => setTimeout(res, Math.random() * 800))

export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

// export const deleteItem = ({key}) => {
//     return localStorage.removeItem(key);
// } 

export const createExpense = ({name, amount, budgetId}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }

    const existingExpense = fetchData('expenses') ?? [];
    return localStorage.setItem("expenses", JSON.stringify([...existingExpense, newItem]));
}

export const getAllMatchingItem = ({category, key, value}) => {
    const data= fetchData(category) ?? [];
    return data.filter((item) => {
        return item[key] === value;
    })
}

export const deleteAllMatchingItem = ({category, key, value}) => {
    const existingData = fetchData(category);
    const newData = existingData.filter(x => x[key] !== value)
    return localStorage.setItem(category, JSON.stringify(newData));
}

export const deleteItem = ({key, id}) => {
    const existingData = fetchData(key);
    if(id) {
        const newData = existingData.filter(x => x.id !== id);
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}

export const createBudget = ({name, amount}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }
    
    const existingBudget = fetchData('budgets') ?? [];
    return localStorage.setItem("budgets", JSON.stringify([...existingBudget, newItem]));
}

const generateRandomColor= () => {
    const existinfBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existinfBudgetLength * 34} 65% 50%`
}

export const calculateSpenByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, x) => {
        if(x.budgetId !== budgetId){
            return acc;
        } else {
            return acc + x.amount;
        } }, 0);
    return budgetSpent;
}

export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {style: "currency", currency: "USD"})
}

export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {style: "percent", minimumFractionDigits: 0})
}

export const formatDateToLocalString = (epoch) => {
    return new Date(epoch).toLocaleDateString();
}