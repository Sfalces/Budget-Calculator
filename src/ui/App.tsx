import { BudgetForm } from './BudgetFrom/BudgetForm'
import { Header } from './Header/Header'

export const App = () => {
  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        <BudgetForm />
      </div>
    </>
  )
}
