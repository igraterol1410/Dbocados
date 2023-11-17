import React, { useEffect, useState } from 'react'
import { RecipeActionsContext, RecipeStateContext } from './RecipeContext'
import { useRouter } from 'next/router'
import useGetRecipes from '@/hooks/useGetRecipes'

interface RecipeProviderProps {
    children: React.ReactNode,
}

const RecipeComponent:React.FC<RecipeProviderProps> = ({ children }) => {
    const router = useRouter()
    const { recipes:currentRecipes } = useGetRecipes()
    const [recipeName, setRecipeName] = useState<string>('')
    const [recipeType, setRecipeType] = useState<string>('')
    const [recipePeople, setRecipePeople] = useState<string>('')    
    const [pageTitle, setPageTitle] = useState<string>('Crear receta')
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
      if(currentRecipes && router.query.rid){
        const recipeData = currentRecipes.filter((eachRecipe) => (eachRecipe.id === router.query.rid))
        if(recipeData.length > 0 && recipeData[0]?.recipeName){
          setRecipeName(recipeData[0]?.recipeName)
          setRecipePeople(recipeData[0]?.recipePeople)
          setRecipeType(recipeData[0]?.recipeType)
        }
      }
    }, [currentRecipes, router.query.rid])
    
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
            progress,
            rid: router.query.rid
        }}
        >
            {children}  
        </RecipeStateContext.Provider>
    </RecipeActionsContext.Provider>
  )
}

export default RecipeComponent
