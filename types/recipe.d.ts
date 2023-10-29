export interface Recipe {
    type: string
    name: string | null,
    people: string,
    ingredientes: RecipeIngredient<[]>
}

export interface RecipeIngredient {
    name: string | null,
    unity: string | null,
    amount: number | null | string
}

export interface RecipeIngredientError {
    name: string | null | undefined,
    unity: string | null | undefined,
    amount: string | null | undefined
}