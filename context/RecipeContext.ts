import { createContext, useContext, Dispatch, SetStateAction } from 'react'

export type RecipeContentState = {
    recipeName: string,
    recipeType:string,
    recipePeople: string,
    pageTitle: string,
    progress: number,
    rid: string | string[] | undefined | null
  }

export type RecipeContentActions = {
  setRecipeName:Dispatch<SetStateAction<string>>,
  setRecipeType: Dispatch<SetStateAction<string>>,
  setRecipePeople: Dispatch<SetStateAction<string>>,
  setPageTitle: Dispatch<SetStateAction<string>>,
  setProgress: Dispatch<SetStateAction<number>>
}

export const RecipeStateContext = createContext<RecipeContentState>({
    recipeName: '',
    recipeType:'',
    recipePeople: '',
    pageTitle: 'Crear receta',
    progress: 0,
    rid: null
})

export const RecipeActionsContext = createContext<RecipeContentActions>({
    setRecipeName: () => {},
    setRecipeType: () => {},
    setRecipePeople: () => {},
    setPageTitle: () => {},
    setProgress: () => {}
})

export const useRecipeStateContext = () => useContext(RecipeStateContext)

export const useRecipeActionsContext = () => useContext(RecipeActionsContext)