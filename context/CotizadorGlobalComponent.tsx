/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { CotizadorActionsContext, CotizadorStateContext } from './CotizadorGlobalContext'
import { Recipe } from '@/types/recipe'
import { CtzGlobalProp } from '@/types/ctz'
import { Expenses } from '@/types/extraExpenses'
import { Ingredients } from '@/types/ingredients'
import useGetIngredients from '@/hooks/useGetIngredients'
import useUserInfo from '@/hooks/useUserInfo'
import useGetExpenses from '@/hooks/useGetExpenses'
import useGetGoal from '@/hooks/useGetGoal'
import { User } from '@/types/user'

interface CotizadorProviderProps {
    children: React.ReactNode,
}

const CotizadorGlobalComponent:React.FC<CotizadorProviderProps> = ({ children }) => {  
    const { uid, userInfo, ctzUser, loading: userLoading } = useUserInfo()
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [golbalUser, setGlobalUser] = useState<User | null| {}>(null)
    const [expenses, setExpenses] = useState<Expenses[]>([])
    const [ctzs, setCtzs] = useState<CtzGlobalProp[]>([])    
    const [ingredients, setIngredients] = useState<Ingredients[]>([])    
    const [recipeToShow, setRecipeToShow] = useState<Recipe | null>(null)        
    const [ctzToShow, setCtzToShow] = useState<CtzGlobalProp | null>(null)        
    const [asideOpen, setAsideOpen] = useState<boolean>(true)
    const { ingredients: currentIngredientes, loading:ingredientsLoading } = useGetIngredients()

    useEffect(() => {
      if(currentIngredientes) {
        setIngredients(currentIngredientes)
      }
    },[currentIngredientes])

    useEffect(() => {
      if(userInfo && !golbalUser && !userLoading) {
        setGlobalUser(userInfo)
      }
    },[userInfo])

  return (
    <CotizadorActionsContext.Provider
      value={{            
        setRecipes,
        setExpenses,
        setCtzs,
        setIngredients,
        setRecipeToShow,
        setCtzToShow,
        setGlobalUser,
        setAsideOpen
      }}
      >
        <CotizadorStateContext.Provider
        value={{
            recipes,
            ctzs,
            expenses,
            ingredients,
            ctzUser,
            uid,
            userInfo: golbalUser,
            userLoading,
            ingredientsLoading,
            recipeToShow,
            ctzToShow,
            asideOpen
        }}
        >
            {children}  
        </CotizadorStateContext.Provider>
    </CotizadorActionsContext.Provider>
  )
}

export default CotizadorGlobalComponent