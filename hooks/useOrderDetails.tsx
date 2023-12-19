import { useEffect, useState } from 'react'
import useUserInfo from './useUserInfo'
import { CtzGlobalProp } from '@/types/ctz'
import useGetRecipes from './useGetRecipes'
import { RecipeIngredient } from '@/types/recipe'

interface OrderProps {
    cake: {name: string, ingredients: RecipeIngredient[] | []}
    filling: {name: string, ingredients: RecipeIngredient[] | []}
    coverage: {name: string, ingredients: RecipeIngredient[] | []}
}

export default function useOrderDetails ( order: CtzGlobalProp | undefined ) {
  const [loading, setLoading] = useState<boolean>(true)
  const { recipes } = useGetRecipes()  
  const { uid } = useUserInfo()
  const [orderInfo, setOrdeInfo] = useState<OrderProps>()
  let cakeDetails = {
    name:'',
    ingredients:[]
  }
  let fillingDetails = {
    name:'',
    ingredients:[]
  }
  let coverageDetails = {
    name:'',
    ingredients:[]
  }

  const getRoundedAmount = (orderPeople:string, recipePeople:string, ingredientAmount:number) => {
    const unidadesAmount = (parseFloat(orderPeople) / parseFloat(recipePeople)) * ingredientAmount
    if((unidadesAmount % 1) > 0.4){ 
        return (unidadesAmount - (unidadesAmount % 1)) + 1
    } else {
        return unidadesAmount - (unidadesAmount % 1)
    }
  }

  const getScaleIngredientAmount = (ingredientAmount:number ,orderPeople:string, recipePeople:string, ingredientUnit:string | null) => {
    switch (ingredientUnit) {
        case 'unidades':
            const unidadesAmount = getRoundedAmount(orderPeople, recipePeople, ingredientAmount)
            return unidadesAmount
        case 'cda':
            const cdaAmount = getRoundedAmount(orderPeople, recipePeople, ingredientAmount)
            return cdaAmount
        case 'cdta':
            const cdtaAmount = getRoundedAmount(orderPeople, recipePeople, ingredientAmount)
            return cdtaAmount
    
        default:
            const totalIngredientAmount = (parseFloat(orderPeople) / parseFloat(recipePeople)) * ingredientAmount
            return totalIngredientAmount
    }
  }

  useEffect(() => {
    if(order && recipes){
        if(order.cake){
            const cakeInfo = recipes.filter((eachRecipe) => eachRecipe.id === order.cake)
            const cakeData = cakeInfo[0]
            const cakeIngredients = cakeData?.recipeIngredients.map((eachIngredient:RecipeIngredient) => (
                {
                    ...eachIngredient,
                    amount: order.people === cakeData.recipePeople ? eachIngredient.amount : getScaleIngredientAmount(eachIngredient.amount, order.people, cakeData.recipePeople, eachIngredient.unity)
                }
            ))
            cakeDetails = {
                name: cakeData.recipeName || '',
                ingredients: cakeIngredients
            }
        }
        if(order.filling){
            const fillingInfo = recipes.filter((eachRecipe) => eachRecipe.id === order.filling)
            const fillingData = fillingInfo[0]
            const fillingIngredients = fillingData.recipeIngredients.map((eachIngredient:RecipeIngredient) => (
                {
                    ...eachIngredient,
                    amount: order.people === fillingData.recipePeople ? eachIngredient.amount : getScaleIngredientAmount(eachIngredient.amount, order.people, fillingData.recipePeople, eachIngredient.unity)
                }
            ))
            fillingDetails = {
                name: fillingData.recipeName || '',
                ingredients: fillingIngredients
            }
        }
        if(order.coverage){
            const coverageInfo = recipes.filter((eachRecipe) => eachRecipe.id === order.coverage)
            const coverageData = coverageInfo[0]
            const coverageIngredients = coverageData.recipeIngredients.map((eachIngredient:RecipeIngredient) => (
                {
                    ...eachIngredient,
                    amount: order.people === coverageData.recipePeople ? eachIngredient.amount : getScaleIngredientAmount(eachIngredient.amount, order.people, coverageData.recipePeople, eachIngredient.unity)
                }
            ))
            coverageDetails = {
                name: coverageData.recipeName || '',
                ingredients: coverageIngredients
            }
        }
        setOrdeInfo({
            cake: cakeDetails,
            coverage: coverageDetails,
            filling: fillingDetails
        })
        setLoading(false)
    }
  }, [uid, order])

  return { loading, orderInfo }
}