import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useBudget } from 'ui/_context/BudgetContext'
import { AmountDisplay } from '../_components/atoms/AmountDisplay'
import 'react-circular-progressbar/dist/styles.css'

export const BudgetTracker = () => {
  const { state, expenseAcount, remainingBudget, dispatch } = useBudget()

  const budget = state.budget
  const percentage = Number(((expenseAcount / state.budget) * 100).toFixed(2))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage === 100 ? '#DC2626' : '#3b82f6',
            trailColor: '#F5F5F5',
            textSize: 8,
            textColor: '#3b82f6'
          })}
          text={`${percentage}% Gastado`}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          onClick={() => dispatch({ type: 'reset-app' })}
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg">
          Resetear App
        </button>
        <AmountDisplay label="Presupuesto" amount={budget} />
        <AmountDisplay label="Disponible" amount={remainingBudget} />
        <AmountDisplay label="Gastado" amount={expenseAcount} />
      </div>
    </div>
  )
}
