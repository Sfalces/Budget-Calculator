import { categories } from 'core/Categories/domain/Categories'
import { ChangeEvent } from 'react'
import { useBudget } from 'ui/_context/BudgetContext'

export const FilterByCategory = () => {
  const { dispatch } = useBudget()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'add-filter-category', payload: { id: e.target.value } })
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
      <form>
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label htmlFor="category">Filtrar Gastos</label>
          <select className="bg-slate-100 p-3 flex-1 rounded" id="category" onChange={handleChange}>
            <option value="">-- Todas las Categorías --</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}
