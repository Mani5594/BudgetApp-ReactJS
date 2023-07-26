import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import Main, { mainLoader } from "./layout/Main";
import { logoutAction } from "./actions/logout";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpensesPage, { expenseAction, ExpensesLoader } from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
import { deleteAction } from "./actions/deleteAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
        loader: ExpensesLoader,
        action: expenseAction
      },
      {
        path: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        children: [
            {
              path: "delete",
              action: deleteAction
            }
        ]
      },
      {
        path: "logout",
        action: logoutAction
      }
      
    ]
  }
  
]);

function App() {

  return (
    <>
    <RouterProvider router={router} />
    <ToastContainer />
    </>
  )
}

export default App
