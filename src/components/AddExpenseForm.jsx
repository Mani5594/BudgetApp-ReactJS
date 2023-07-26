import { useEffect, useRef } from "react"
import { useFetcher, Form } from "react-router-dom"
import { PlusCircleIcon } from '@heroicons/react/24/solid'

const AddExpenseForm = ({budgets}) => {
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === "submitting"
    const formRef = useRef()
    const focusRef = useRef()

    useEffect(() => {
        if(!isSubmitting) {
            formRef.current.reset()
            focusRef.current.focus()
        }
    }, [isSubmitting])
  return (
    <div className="form-wrapper">
        <h2 className="h3">Add New <span className="accent">
            {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}</span>{' '}Expense</h2>

        <fetcher.Form method="post" className="grid-sm" ref={formRef}>
            <div className="expense-inputs">
                <div className="grid-xs">
                    <label htmlFor="newExpense">Expense Name</label>
                    <input type="text" name="newExpense" id="newExpense" required ref={focusRef} placeholder="e.g.,Coffee"/>
                </div>
                <div className="grid-xs">
                    <label htmlFor="newExpenseAmount">Amount</label>
                    <input type="number" step="0.01" name="newExpenseAmount" id="newExpenseAmount" required placeholder="e.g., $2.30"/>
                </div>
            </div>
            <div className="grid-xs" hidden={budgets.length === 1}>
                <label htmlFor="newExpenseBudget">Budget Category</label>
                <select name="newExpenseBudget" id="newExpenseBudget" required>
                    {
                        budgets.sort((a,b) => a.createdAt - b.createdAt).map((budget) => {
                            return <option value={budget.id} key={budget.id}>{budget.name}</option>
                        })
                    }
                </select>
            </div>
            <input type="hidden" value="createExpense" name="_action" />
            <button className="btn btn--dark" type="submit" disabled={isSubmitting}>
                {
                    isSubmitting ? <span>Submitting expense...</span> : 
                    <>
                        <span>Add Expense</span>
                        <PlusCircleIcon  width={20}/>
                    </>
                }
            </button>
        </fetcher.Form>
    </div>
  )
}

export default AddExpenseForm
