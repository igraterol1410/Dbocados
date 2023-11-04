import { useEffect, useState } from 'react'
import useUserInfo from './useUserInfo'
import { getUserGoal } from '@/services/goal'

export default function useGetGoal () {
  const [goal, setGoal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const { uid } = useUserInfo()

  useEffect(() => {
    setLoading(true)
    if(uid){
      getUserGoal(uid).then((res:number) => {
        setGoal(res)
        setLoading(false)
      })
    }
  }, [uid])

  return { goal, loading }
}