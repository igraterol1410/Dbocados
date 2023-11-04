import React from 'react'
import { Box, Button, ButtonGroup, GridItem, Text } from '@chakra-ui/react'
import { Recipe } from '@/types/recipe'

const RecipeCard= ({recipe}:{recipe: Recipe}) => {
  return (
    <GridItem 
    borderRadius={12} 
    shadow='xl'
    border='1px solid rgba(0, 0, 0, .3)'
    px={4}
    py={2}
    >
        <Box pb={3}>
            <Text fontWeight='bold'>
                {recipe.recipeName}
            </Text>
            <Text>
                {recipe.recipeType}
            </Text>
        </Box>
        <ButtonGroup w='full'>
            <Button w='full'>Editar</Button>
            <Button w='full'>Eliminar</Button>
        </ButtonGroup>
    </GridItem>
  )
}

export default RecipeCard
