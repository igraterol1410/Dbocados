import { useEffect, useState } from 'react'
import useUserInfo from './useUserInfo'
import { getUserIngredients } from '@/services/ingredientList'
import { Ingredients } from '@/types/ingredients'

export default function useGetIngredients () {
  const [ingredients, setIngredients] = useState<Ingredients[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { uid } = useUserInfo()

  useEffect(() => {
    setLoading(true)
    if(uid){
      getUserIngredients(uid).then((res) => {
        setIngredients(res)
        setLoading(false)
      })
    }
  }, [uid])

  return { ingredients, loading }
}