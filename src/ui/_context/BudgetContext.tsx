import { useReducer, createContext, Dispatch, PropsWithChildren, useContext } from 'react'
import { BudgetActions, budgetReducer, BudgetState, initialState } from 'ui/_reducers/budget-reducer'

interface State {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
  expenseAcount: number
  remainingBudget: number
}

const defaultState: State = {
  state: initialState,
  dispatch: () => {},
  expenseAcount: 0,
  remainingBudget: 0
}

export const useBudget = () => {
  return useContext(BudgetContext)
}

export const BudgetContext = createContext<State>(defaultState)

export const BudgetProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState)

  const expenseAcount = state.expenses.reduce((acc, expense) => expense.amount + acc, 0)
  const remainingBudget = state.budget - expenseAcount
  return (
    <BudgetContext.Provider value={{ state, dispatch, expenseAcount, remainingBudget }}>
      {children}
    </BudgetContext.Provider>
  )
}

export type BudgetContextHook = ReturnType<typeof useBudget>
