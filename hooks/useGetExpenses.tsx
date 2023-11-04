import { useEffect, useState } from 'react'
import useUserInfo from './useUserInfo'
import { getUserExtraExpenses } from '@/services/ingredientList'
import { Expenses } from '@/types/extraExpenses'

export default function useGetExpenses () {
  const [extraExpenses, setExtraExpenses] = useState<Expenses[]>([])
  const [totalExpense, setTotalExpense] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const { uid } = useUserInfo()

  useEffect(() => {
    setLoading(true)
    if(uid){
      getUserExtraExpenses(uid).then((res:Expenses[]) => {
        setExtraExpenses(res)
        const initialValue = 0;
        const pricesArray = res.map((element) => (element.price))
        const totalPrice = pricesArray.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)
        setTotalExpense(totalPrice)
        setLoading(false)
      })
    }
  }, [uid])

  return { extraExpenses, totalExpense, loading }
}