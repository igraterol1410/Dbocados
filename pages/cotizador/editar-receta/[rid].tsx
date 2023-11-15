import { useRouter } from 'next/router'
import React from 'react'

const Recipe = () => {
    const router = useRouter()
    console.log(router.query)
  return (
    <div>
      Hola
    </div>
  )
}

export default Recipe
