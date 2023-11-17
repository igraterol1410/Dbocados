import CreateRecipe from '@/components/layout/cotizador/crear-receta/CreateRecipe'
import RecipeComponent from '@/context/RecipeComponent'
import React from 'react'

const EditRecipe = () => {
  return (
    <RecipeComponent>
      <CreateRecipe />
    </RecipeComponent>
  )
}

export default EditRecipe
