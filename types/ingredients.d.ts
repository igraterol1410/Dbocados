export interface Ingredients {
    name: string | null,
    unity: string | null,
    amount: number | null | string,
    price: number
}

export interface IngredientsError {
    name: string | null | undefined,
    unity: string | null | undefined,
    amount: string | null | undefined,
    price: string | null | undefined
}