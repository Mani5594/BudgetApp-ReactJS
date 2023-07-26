import { Link, useFetcher, Form } from "react-router-dom";
import { formatCurrency, formatDateToLocalString, getAllMatchingItem } from "../helper"
import { TrashIcon } from '@heroicons/react/24/solid'

const ExpenseItem = ({expense, showBudget=true}) => {
    const fetcher = useFetcher();
const budget = getAllMatchingItem({
    category:'budgets',
    key:"id",
    value: expense.budgetId
})[0]

  return (
    <>
    <td>{expense.name}</td>
    <td>{formatCurrency(expense.amount)}</td>
    <td>{formatDateToLocalString(expense.createdAt)}</td>
    <td>{showBudget && (<Link to={`/budget/${budget.id}`} style={{"--accent": budget.color}}>{budget.name}</Link>)}</td>
    <td>
        <fetcher.Form method="post">
            <input type="hidden" name="_action" value="deleteExpense" />
            <input type="hidden" name="expenseId" value={expense.id} />
            <button type="submit" className="btn btn--warning"><TrashIcon width={20}/></button>
        </fetcher.Form>
    </td>
    </>
  )
}

export default ExpenseItem
