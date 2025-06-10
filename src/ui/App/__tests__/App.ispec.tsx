import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from '../App'
import { BudgetProvider } from 'ui/_context/BudgetContext'

describe('BudgetForm', () => {
  it('should render the form', () => {
    render(
      <BudgetProvider>
        <App />
      </BudgetProvider>
    )

    expect(screen.getByText('Definir Presupuesto')).toBeDefined()
  })

  it('should change the form value', async () => {
    render(
      <BudgetProvider>
        <App />
      </BudgetProvider>
    )

    const input = screen.getByPlaceholderText('Define tu presupuesto') as HTMLInputElement
    expect(input.value).toBe('0')
    await userEvent.type(input, '500')

    expect(input.value).toBe('500')
  })

  it('should show the BudgetTracker if we add a budget', async () => {
    render(
      <BudgetProvider>
        <App />
      </BudgetProvider>
    )

    const input = screen.getByPlaceholderText('Define tu presupuesto') as HTMLInputElement
    const submit = screen.getByTestId('submitBudget')
    expect(input.value).toBe('0')
    await userEvent.type(input, '500')

    expect(input.value).toBe('500')
    await userEvent.click(submit)

    expect(await screen.findByText('Resetear App')).toBeDefined()
  })

  it('should show the modal if addExpenditure button is clicked', async () => {
    render(
      <BudgetProvider>
        <App />
      </BudgetProvider>
    )

    const input = screen.getByPlaceholderText('Define tu presupuesto') as HTMLInputElement
    const submit = screen.getByTestId('submitBudget')

    await userEvent.type(input, '500')
    await userEvent.click(submit)

    const resetButton = await screen.findByText('Resetear App')
    expect(resetButton).toBeDefined()

    const addExpenditureButton = await screen.findByTestId('addExpenditure')
    await userEvent.click(addExpenditureButton)

    expect(await screen.findByText('Nombre Gasto:')).toBeDefined()
  })
})
