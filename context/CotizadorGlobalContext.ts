import { CtzGlobalProp } from '@/types/ctz'
import { Expenses } from '@/types/extraExpenses'
import { Ingredients } from '@/types/ingredients'
import { Recipe } from '@/types/recipe'
import { createContext, useContext, Dispatch, SetStateAction } from 'react'

export type RecipeContentState = {
    recipes: Recipe[],
    ctzs: CtzGlobalProp[],
    ingredients: Ingredients[],
    expenses: Expenses[],
    ctzUser: boolean,
    uid: string,
    userInfo: any,
    ingredientsLoading: boolean,
    userLoading: boolean,
    recipeToShow: Recipe | null,
    ctzToShow: CtzGlobalProp | null,
    asideOpen: boolean
  }

export type RecipeContentActions = {
  setRecipes:Dispatch<SetStateAction<Recipe[]>>,
  setCtzs: Dispatch<SetStateAction<CtzGlobalProp[]>>,
  setIngredients: Dispatch<SetStateAction<Ingredients[]>>,
  setExpenses: Dispatch<SetStateAction<Expenses[]>>,
  setRecipeToShow: Dispatch<SetStateAction<Recipe | null>>,
  setCtzToShow: Dispatch<SetStateAction<CtzGlobalProp | null>>,
  setAsideOpen: Dispatch<SetStateAction<boolean>>
}

export const CotizadorStateContext = createContext<RecipeContentState>({
    recipes: [],
    ctzs: [],
    ingredients: [],
    expenses: [],
    ctzUser: false,
    uid: '',
    userInfo: '',
    ingredientsLoading: false,
    userLoading: false,
    recipeToShow: null,
    ctzToShow: null,
    asideOpen: false
})

export const CotizadorActionsContext = createContext<RecipeContentActions>({
    setRecipes: () => {},
    setCtzs: () => {},
    setIngredients: () => {},
    setExpenses: () => {},
    setRecipeToShow: () => {},
    setCtzToShow: () => {},
    setAsideOpen: () => {}
})

export const useCotizadorStateContext = () => useContext(CotizadorStateContext)

export const useCotizadorActionsContext = () => useContext(CotizadorActionsContext)