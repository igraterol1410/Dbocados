import { RECIPE_TYPES_VALUES } from '@/constant/recipeTypes'
import { getUserRecipes } from '@/services/recipes'
import { Recipe } from '@/types/recipe'
import { useEffect, useState } from 'react'
import useUserInfo from './useUserInfo'

export default function useGetRecipes () {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [fillings, setFillings] = useState<Recipe[]>([])
  const [cakes, setCakes] = useState<Recipe[]>([])
  const [coverages, setCoverages] = useState<Recipe[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { uid } = useUserInfo()

  useEffect(() => {
    setLoading(true)
    if(uid){
      getUserRecipes(uid).then((res) => {
        const differentsCakes = res.filter((eachRecipe:Recipe) => (eachRecipe.recipeType === RECIPE_TYPES_VALUES.cake))
        const differentsFillings = res.filter((eachRecipe:Recipe) => (eachRecipe.recipeType === RECIPE_TYPES_VALUES.filling))
        const differentsCoverages = res.filter((eachRecipe:Recipe) => (eachRecipe.recipeType === RECIPE_TYPES_VALUES.coverage))
        setRecipes(res)
        setFillings(differentsFillings)
        setCakes(differentsCakes)
        setCoverages(differentsCoverages)
        setLoading(false)
      })
    }
  }, [uid])

  return { recipes, cakes, fillings, coverages, loading }
}