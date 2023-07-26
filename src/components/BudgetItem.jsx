import { Link, Form } from "react-router-dom";
import { calculateSpenByBudget, formatCurrency, formatPercentage } from "../helper";
import { TrashIcon, BanknotesIcon } from '@heroicons/react/24/solid'


const BudgetItem = ({budget, showdelete = false}) => {
    const {id, name, amount, color} = budget;
    const spent = calculateSpenByBudget(id);

  return (
    <div className="budget" style={{"--accent": color}}>
        <div className="progress-text">
            <h3>{name}</h3>
            <p>{formatCurrency(amount)} Budgeted</p>
        </div>
        <progress max={amount} value={spent}>
            {formatPercentage(spent/amount)}
        </progress>
        <div className="progress-text">
            <small>{formatCurrency(spent)}</small>
            <small>{formatCurrency(amount-spent)}</small>
        </div>
        {showdelete ? (
            <div className="flex-sm">
                <Form method="post" action="delete" onSubmit={(event) => {
                 if(!confirm("Are you sure you want to permanently delete this budget?")){
                    event.preventDefault();
                 }
                }}>
                    <input type="hidden" name="_action" value="deleteBudget" />
                    <input type="hidden" name="budgetId" value={budget.id} />
                    <button type="submit" className="btn">Delete Budget <TrashIcon width={20}/></button>
                </Form>
            </div>
        ) : (
            <div className="flex-sm">
                <Link className="btn" to={`/budget/${budget.id}`} style={{"--accent": budget.color}} >Show Budget <BanknotesIcon width={20}/></Link>
            </div>
        )}

    </div>
  )
}

export default BudgetItem
