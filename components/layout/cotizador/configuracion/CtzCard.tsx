import React from 'react'
import { Badge, Box, Button, Center, GridItem, Text } from '@chakra-ui/react'
import { Recipe } from '@/types/recipe'
import { RECIPE_TYPES } from '@/constant/recipeTypes'
import { CtzGlobalProp } from '@/types/ctz'

const CtzCard= ({ctz}:{ctz: CtzGlobalProp}) => {
  return (
    <GridItem 
    borderRadius={12} 
    shadow='xl'
    border='1px solid rgba(0, 0, 0, .3)'
    px={4}
    py={2}
    >
        <Box pb={3}>
            <Text fontWeight='bold' textAlign='center'>
                Para: {ctz.ctzPeople}
            </Text>
            <Badge variant='subtle' colorScheme='green'>{ctz.ctzPeople}</Badge>
        </Box>
        <Center>
            <Button>Ver detalles</Button>
        </Center>
    </GridItem>
  )
}

export default CtzCard