import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const index = () => {
    const router = useRouter()
    useEffect(() => {
        router.push('/')
    }, [])
  return (
    <></>
  )
}

export default index
