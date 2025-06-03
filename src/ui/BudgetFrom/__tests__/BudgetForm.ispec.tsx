import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BudgetForm } from '../BudgetForm'

describe('BudgetForm', () => {
  it('should render the form', () => {
    render(<BudgetForm />)

    expect(screen.getByText('Definir Presupuesto')).toBeDefined()
  })

  it('should change the form value', async () => {
    render(<BudgetForm />)

    const input = screen.getByPlaceholderText('Define tu presupuesto') as HTMLInputElement
    expect(input.value).toBe('0')
    await userEvent.type(input, '500')

    expect(input.value).toBe('500')
  })
})
