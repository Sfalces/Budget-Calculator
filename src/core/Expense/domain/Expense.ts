type ValuePiece = Date | null

export type Value = ValuePiece | [ValuePiece, ValuePiece]

export interface Expense {
  id: string
  amount: number
  expenseName: string
  category: string
  date: Value
}

export interface DraftExpense {
  amount: number
  expenseName: string
  category: string
  date: Value
}
