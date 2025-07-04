import { categories } from 'core/Categories/domain/Categories'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { DraftExpense, Value } from 'core/Expense/domain/Expense'
import { ErrorMessage } from 'ui/_components/atoms/ErrorMessage'
import { useBudget } from 'ui/_context/BudgetContext'

export const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  })

  const { dispatch, state, remainingBudget } = useBudget()
  const [error, setError] = useState('')
  const [prevAmount, setPrevAmount] = useState(0)

  useEffect(() => {
    if (state.editingId) {
      const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0]
      setExpense(editingExpense)
      setPrevAmount(editingExpense.amount)
    }
  }, [state.editingId])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    const isAmountField = ['amount'].includes(name)
    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value
    })
  }

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios')
      return
    }

    if (expense.amount - prevAmount > remainingBudget) {
      setError('Ese gasto sale del presupuesto')
      return
    }

    if (state.editingId) {
      dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } })
    } else {
      dispatch({ type: 'add-expense', payload: { expense } })
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 ">
        {state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2 mt-5">
        <label htmlFor="expenseName" className="text-xl">
          Nombre Gasto:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Añade el nombre del gasto"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Cantidad:
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Añade la cantidad del gasto ej. 300"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          onFocus={e => {
            if (e.target.value === '0') e.target.value = ''
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categoria:
        </label>
        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          value={expense.category}
          onChange={handleChange}>
          <option value="">-- Seleccione --</option>
          {categories.map(categoty => (
            <option key={categoty.id} value={categoty.id}>
              {categoty.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Fecha Gasto:
        </label>
        <DatePicker className="bg-slate-100 p-2 border-0" value={expense.date} onChange={handleChangeDate} />
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full mt-5 p-2 text-white uppercase font-bold rounded-lg"
        value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
      />
    </form>
  )
}
