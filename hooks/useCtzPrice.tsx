import { useEffect, useState } from 'react'
import { WorkHand } from '@/types/workHand'
import { RecipeIngredient } from '@/types/recipe'
import { Expenses } from '@/types/extraExpenses'
import useGetRecipes from './useGetRecipes'
import { INGREDIENT_UNIT } from '@/constant/unities'
import useGetIngredients from './useGetIngredients'
import { currencyFormatter } from '@/functions/financeFunctions'
import useGetGoal from './useGetGoal'
import useGetExpenses from './useGetExpenses'
import { CtzInfoProp } from '@/types/ctz'

export default function useCtzPrice (
    ctzWorkHand: WorkHand, 
    ctzCake: string, 
    ctzCoverage: string, 
    ctzFilling: string, 
    ctzExtra: Expenses[], 
    ctzPeople: string, 
    ctzEarn: number 
) {
  const [cyzInfo, setCtzInfo] = useState<CtzInfoProp>()
  const [loading, setLoading] = useState<boolean>(false)
  const { recipes } = useGetRecipes()  
  const { ingredients } = useGetIngredients()
  const { goal } = useGetGoal()
  const { totalExpense } = useGetExpenses()
  let cakePrice = 0
  let cakeName: string | null = ''
  let fillingName: string | null = ''
  let coverageName: string | null = ''
  let fillingPrice = 0
  let coveragePrice = 0
  let extraAmount = 0
  let roundedAmount = 0

  const getScaleUnit = (unit:string | null) => {
    const scaleUnit = INGREDIENT_UNIT.filter((eachUnit) => (eachUnit.unit === unit))
    return scaleUnit[0].alternative_conversion.scale
  }

  const getIngredientFromList = (ref:number | string) => {
    const ingredientRef = ingredients.filter((eachIngredient) => (eachIngredient.id === ref))
    return ingredientRef[0]
  }

  const getRecipePrice = (ingredientsList:RecipeIngredient[]) => {
    let amount = 0
    ingredientsList && ingredientsList.forEach((ingredients) => {
      const refIngredient = getIngredientFromList(ingredients.productRef)
      if(refIngredient && ingredients.unity === refIngredient.unity){
          amount = amount + ((ingredients.amount / refIngredient.amount) * refIngredient?.price)
      } else {
          amount = amount + (ingredients.amount * getScaleUnit(ingredients.unity) * getIngredientFromList(ingredients.productRef)?.price)
      }
    })
    return amount
  }

  useEffect(() => {
    setLoading(true)
    if(recipes && ingredients && goal && totalExpense){
      if(ctzCake !== ''){
        const currentCake = recipes.filter((eachRecipe) => eachRecipe.id === ctzCake)
        cakeName = currentCake[0]?.recipeName
        const cakeRecipePrice = getRecipePrice(currentCake[0]?.recipeIngredients)
        cakePrice = ((parseFloat(ctzPeople) / parseFloat(currentCake[0]?.recipePeople)) * cakeRecipePrice)
      }
      if(ctzFilling !== ''){
        const currentFilling = recipes.filter((eachRecipe) => eachRecipe.id === ctzFilling)
        fillingName = currentFilling[0]?.recipeName
        const fillingRecipePrice = getRecipePrice(currentFilling[0]?.recipeIngredients)
        fillingPrice = ((parseFloat(ctzPeople) / parseFloat(currentFilling[0]?.recipePeople)) * fillingRecipePrice)
      }
      if(ctzCoverage !== ''){
        const currentCoverage = recipes.filter((eachRecipe) => eachRecipe.id === ctzCoverage)
        coverageName = currentCoverage[0]?.recipeName
        const coverageRecipePrice = getRecipePrice(currentCoverage[0]?.recipeIngredients)
        coveragePrice = ((parseFloat(ctzPeople) / parseFloat(currentCoverage[0]?.recipePeople)) * coverageRecipePrice)
      }
      if(ctzExtra){
        ctzExtra.forEach((extra) => {
          extraAmount = extraAmount + extra.price
        })
      }
      const totalWh = ctzWorkHand.hours * ctzWorkHand.hoursPrice
      const indirectExpenses = totalExpense / goal
      const directExpenses = cakePrice + fillingPrice + coveragePrice
      const totalEarn = (directExpenses + totalWh) * (ctzEarn/100)
      const totalCtz = directExpenses + totalEarn + totalWh + extraAmount + indirectExpenses
      if((totalCtz % 5) > 2){
        roundedAmount = totalCtz + (5 - (totalCtz % 5))
      } else {
        roundedAmount = totalCtz - (totalCtz % 5)
      }
      setCtzInfo({
        ctzCakePrice: currencyFormatter(cakePrice),
        ctzCakeName: cakeName,
        ctzFillingPrice: currencyFormatter(fillingPrice),
        ctzFillingName: fillingName,
        ctzCoveragePrice: currencyFormatter(coveragePrice),
        ctzCoverageName: coverageName,
        ctzExtraPrice: currencyFormatter(extraAmount),
        ctzWhPrice: currencyFormatter(totalWh),
        ctzIndirectExpenses: currencyFormatter(indirectExpenses),
        ctzEarn: currencyFormatter(totalEarn),
        ctzTotalPrice: currencyFormatter(totalCtz),
        ctzRoundedAmount: currencyFormatter(roundedAmount)
      })
      setLoading(false)
    }
  }, [ingredients, recipes, totalExpense])

  return { cyzInfo, loading }
}