import React, { useState } from 'react'
import { RecipeActionsContext, RecipeStateContext } from './RecipeContext'

interface RecipeProviderProps {
    children: React.ReactNode,
}

const RecipeComponent:React.FC<RecipeProviderProps> = ({ children }) => {
    const [recipeName, setRecipeName] = useState<string>('')
    const [recipeType, setRecipeType] = useState<string>('')
    const [recipePeople, setRecipePeople] = useState<string>('')    
    const [pageTitle, setPageTitle] = useState<string>('Crear receta')
    const [progress, setProgress] = useState<number>(0)

  return (
    <RecipeActionsContext.Provider
      value={{            
          setRecipeName,
          setRecipeType,
          setRecipePeople,
          setPageTitle,
          setProgress
      }}
      >
        <RecipeStateContext.Provider
        value={{
            recipeName,
            recipeType,
            recipePeople,
            pageTitle,
            progress
        }}
        >
            {children}  
        </RecipeStateContext.Provider>
    </RecipeActionsContext.Provider>
  )
}

export default RecipeComponent
