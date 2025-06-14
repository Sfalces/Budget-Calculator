import { useState, ChangeEvent, FormEvent } from 'react'
import { useBudget } from 'ui/_context/BudgetContext'

export const BudgetForm = () => {
  const [budget, setBudget] = useState(0)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber)
  }

  const { dispatch, state } = useBudget()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({ type: 'add-budget', payload: { budget } })
  }

  const isValid = isNaN(budget) || budget <= 0

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
          Define tu Presupuesto
        </label>
        <input
          id="budget"
          type="number"
          className="w-full bg-white border border-gray200 p-2"
          placeholder="Define tu presupuesto"
          name="budget"
          value={budget}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        value="Definir Presupuesto"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40"
        disabled={isValid}
        data-testid="submitBudget"
      />
    </form>
  )
}
