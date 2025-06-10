import { useBudget } from 'ui/_context/BudgetContext'
import { ExpenseDetail } from './_components/ExpenseDetail'

export const ExpenseList = () => {
  const { state } = useBudget()

  const filteredExpense = state.currentCategory
    ? state.expenses.filter(expense => expense.category === state.currentCategory)
    : state.expenses

  const isEmpty = filteredExpense.length === 0

  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold">No Hay Gastos</p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos:</p>
          {filteredExpense.map(expense => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  )
}
