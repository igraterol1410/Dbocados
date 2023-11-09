import { RecipeIngredient } from '@/types/recipe'
import { Grid, GridItem, Center } from '@chakra-ui/react'
import React from 'react'

interface ProductProps {
    product:RecipeIngredient,
    handleRemoveProduct: (product: RecipeIngredient) => void
}

const RecetaFormProduct:React.FC<ProductProps> = ({product, handleRemoveProduct}) => {
  return (
    <Grid
    gridTemplateColumns='1fr 100px 100px'
    fontSize={['14px', '16px']}
    gap={4}
    alignContent='center'
    alignItems='center'
    w='100%' 
    py={2} 
    px={4}
    border='1px solid #e80297'
    color='#e80297' 
    marginBottom={2}
    borderRadius={8}>
        <GridItem>
            {product.name}
        </GridItem>
        <GridItem textAlign='center'>
            {`${product.amount}${product.unity}`}
        </GridItem>
        <GridItem
        bg='#e80297' 
        color='white'
        borderRadius={8}
        _hover={{
            cursor:'pointer',
            bg:'white',
            color:'#e80297'
        }}
        onClick={() => handleRemoveProduct(product)}>
            <Center px={3}>
                Eliminar
            </Center>
        </GridItem>
    </Grid>
  )
}

export default RecetaFormProduct
