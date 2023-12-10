import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Grid, Heading, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useStockStateContext } from "@/context/StockContext";
import Ilustracion from '@/assets/no-image.svg'
import useGetIngredients from "@/hooks/useGetIngredients";
import Image from "next/image";
import useFilterTable from "@/hooks/useFilterTable";
import { currencyFormatter } from '@/functions/financeFunctions';
import { FaPen, FaPlus } from 'react-icons/fa';
import { useCotizadorStateContext } from '@/context/CotizadorGlobalContext';

const StockGallery = () => {
    const { ingredients } = useCotizadorStateContext()
    const { filterParam, itemSearch } = useStockStateContext()
    const { productsData } = useFilterTable(filterParam, itemSearch, ingredients)
  return (
    <Grid templateColumns={['1fr', 'repeat(4, 1fr)']} gap={4} mt={4}>
    {
      productsData && productsData.map((product, index) => (
        <Card shadow='xl' key={index} maxW='sm' rounded={20}>
          <CardBody>
            <Box display='flex' justifyContent='center' marginInline='auto' position='relative' w={['100px', '150px']}>
                <Image
                width={100}
                height={100}
                src={product.image || Ilustracion}
                alt='Logo dbocados'
                />
            </Box>
            <Stack mt='6' spacing='3'>
              <Heading size='md' noOfLines={1}>{product.name}</Heading>
              <Text>
                <b>Disponible:</b> {product.balance || 0} {product.unity}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing='2'>
              <Button>
                <FaPlus />
              </Button>
              <Button variant='outline'>
                <FaPen />
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))
    }
  </Grid>
  )
}

export default StockGallery