import { useEffect, useState } from 'react'
import useUserInfo from './useUserInfo'
import { CtzGlobalProp } from '@/types/ctz'
import { getUserCtzs } from '@/services/cotizaciones'

export default function useGetCtz () {
  const [ctz, setCtz] = useState<CtzGlobalProp[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { uid } = useUserInfo()

  useEffect(() => {
    setLoading(true)
    if(uid){
      getUserCtzs(uid).then((res) => {
        setCtz(res)
        setLoading(false)
      })
    }
  }, [uid])

  return { ctz, loading }
}