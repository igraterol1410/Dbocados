export interface Expenses {
    id: number
    name: string | null,
    price: number
}

export interface ExpensesError {
    name: string | null | undefined,
    price: string | null | undefined
}