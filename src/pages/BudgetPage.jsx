import React from 'react'
import { createExpense, deleteAllMatchingItem, deleteItem, getAllMatchingItem } from '../helper'
import { useLoaderData } from 'react-router-dom'
import BudgetItem from '../components/BudgetItem'
import AddExpenseForm from '../components/AddExpenseForm'
import Table from '../components/Table'
import { toast } from 'react-toastify'

export async function budgetLoader({params}){
    const budget = await getAllMatchingItem({category:'budgets',key:'id',value:params.id })[0]
    const expenses = await getAllMatchingItem({category:'expenses',key:'budgetId',value:params.id })

    return {budget, expenses}
}

export async function budgetAction({request}) {
    
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);

    if(_action === 'deleteExpense') {
        try {
            deleteItem({key: 'expenses', id: values.expenseId})
            return toast.success("Expense deleted!")
        } catch (error) {
            throw new Error("There was a problem deleting your expense")
        }
    }

    if(_action === 'createExpense') {
        try {
            createExpense({name:values.newExpense, amount:values.newExpenseAmount, budgetId: values.newExpenseBudget})
            return toast.success(`Expense ${values.newExpense} Created!`)
        } catch (error) {
            throw new Error("There was a problem creating your expense")
        }
    }
}

const BudgetPage = () => {

const {budget, expenses} = useLoaderData()

  return (
    <div className="grid-lg" style={{"--accent": budget.color}}>
        <h1 className="h2">
            <span className="accent">{budget.name}</span>{' '}
            Overview
        </h1>
        <div className="flex-lg">
            <BudgetItem budget={budget} showdelete={true}/>
            <AddExpenseForm budgets={[budget]}/>
            <div className='grid-md'>
                <h2>
                <span className="accent">{budget.name}</span>{' '}
                Expences</h2>
                <Table expenses={expenses.sort((a,b) => b.createdAt - a.createdAt)} showBudget={false} />
            </div>
            
        </div>
    </div>
  )
}

export default BudgetPage
