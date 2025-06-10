import { Expense } from 'core/Expense/domain/Expense'
import { LeadingActions, SwipeableList, SwipeAction, SwipeableListItem, TrailingActions } from 'react-swipeable-list'
import { FC, useMemo } from 'react'
import { formatDate } from 'ui/_helpers'
import { AmountDisplay } from 'ui/_components/atoms/AmountDisplay'
import { categories } from 'core/Categories/domain/Categories'
import 'react-swipeable-list/dist/styles.css'
import { useBudget } from 'ui/_context/BudgetContext'

interface Props {
  expense: Expense
}

export const ExpenseDetail: FC<Props> = ({ expense }) => {
  const { dispatch } = useBudget()
  const categoryInfo = useMemo(() => categories.find(cat => cat.id === expense.category), [expense])

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => dispatch({ type: 'get-expense-by-id', payload: { id: expense.id } })}>
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => dispatch({ type: 'delete-expense', payload: { id: expense.id } })} destructive={true}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem maxSwipe={30} leadingActions={leadingActions()} trailingActions={trailingActions()}>
        <div className="bg-white shadow-lg p-3 w-full border-b border-gray-200 flex gap-5 items-center">
          <div>
            <img src={`/icono_${categoryInfo?.icon}.svg`} alt="icono gasto" className="w-20 h-20" />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-xm font-bold uppercase text-slate-500">{categoryInfo!.name}</p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
          </div>
          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
