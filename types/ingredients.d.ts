export interface Ingredients {
    id: string | number
    name: string | null,
    unity: string | null,
    amount: number,
    price: number
}

export interface IngredientsError {
    name: string | null | undefined,
    unity: string | null | undefined,
    amount: string | null | undefined,
    price: string | null | undefined
}