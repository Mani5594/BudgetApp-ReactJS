import { redirect } from "react-router-dom"
import { toast } from "react-toastify"
import { deleteAllMatchingItem, deleteItem } from "../helper"

export const deleteAction = ({params}) => {
        console.log({key: 'budgets', id: params.id})
    try {
        deleteItem({key: 'budgets', id: params.id})
        deleteAllMatchingItem({category:'expenses', key:'budgetId', value: params.id})
        toast.success('Budget Deleted!')
    } catch (error) {
        throw new Error("There was a problem deleting your Budget")
    }
    return redirect('/')
}