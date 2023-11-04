export interface Recipe {
    id: number | string,
    recipeType: string,
    recipeName: string | null,
    recipePeople: string,
    recipeIngredients: RecipeIngredient<[]>,
    recipePrice: number
}

export interface RecipeIngredient {
    name: string | null,
    unity: string | null,
    amount: number,
    productRef: number | string
}

export interface RecipeIngredientError {
    name: string | null | undefined,
    unity: string | null | undefined,
    amount: string | null | undefined
}