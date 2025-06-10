import { BudgetForm } from '../BudgetFrom/BudgetForm'
import { Header } from '../Header/Header'
import { BudgetTracker } from '../BudgetTracker/BudgetTracker'
import ExpenseModal from '../_modals/ExpenseModal/ExpenseModal'
import { useBudget } from 'ui/_context/BudgetContext'
import { ExpenseList } from 'ui/ExpenseList/ExpenseList'
import { useEffect } from 'react'
import { FilterByCategory } from 'ui/FilterByCategory/FilterByCategory'

export const App = () => {
  const { state } = useBudget()

  const budget = state.budget

  const isValidBudget = budget > 0

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>
      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  )
}
