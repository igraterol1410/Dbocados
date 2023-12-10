export interface Ingredients {
    id: string | number
    name: string | null,
    unity: string | null,
    amount: number,
    balance: number,
    image:string,
    price: number,
    created_at: Date,
    updated_at: Date
}
export interface IngredientsForm {
    name: string | null,
    unity: string | null,
    amount: number,
    balance: number,
    image:string,
    price: number
}

export interface IngredientsError {
    name: string | null | undefined,
    unity: string | null | undefined,
    amount: string | null | undefined,
    price: string | null | undefined
}