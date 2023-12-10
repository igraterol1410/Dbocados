import React from 'react'
import { Badge, Box, Button, Center, GridItem, Text } from '@chakra-ui/react'
import { Recipe } from '@/types/recipe'
import { RECIPE_TYPES } from '@/constant/recipeTypes'
import { useCotizadorActionsContext } from '@/context/CotizadorGlobalContext'

const RecipeCard= ({recipe}:{recipe: Recipe}) => {
  const { setRecipeToShow } = useCotizadorActionsContext()
  return (
    <GridItem 
    borderRadius={20} 
    shadow='xl'
    border='1px solid rgba(0, 0, 0, .3)'
    px={4}
    py={2}
    display='flex'
    flexDirection='column'
    justifyContent='space-between'
    >
        <Box pb={3}>
            <Text fontWeight='bold' textAlign='center'>
                {recipe.recipeName}
            </Text>
            <Badge rounded={20} variant='subtle' colorScheme={recipe.recipeType === RECIPE_TYPES[0] ? 'green' : (recipe.recipeType === RECIPE_TYPES[1] ? 'red' : 'blue')}>{recipe.recipeType}</Badge>
        </Box>
        <Center>
            <Button size='sm' onClick={() => setRecipeToShow(recipe)}>Ver detalles</Button>
        </Center>
    </GridItem>
  )
}

export default RecipeCard
