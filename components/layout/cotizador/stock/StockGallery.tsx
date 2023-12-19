import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Grid, Heading, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useStockActionsContext, useStockStateContext } from "@/context/StockContext";
import Ilustracion from '@/assets/no-image.svg'
import useGetIngredients from "@/hooks/useGetIngredients";
import Image from "next/image";
import useFilterTable from "@/hooks/useFilterTable";
import { currencyFormatter } from '@/functions/financeFunctions';
import { FaPen, FaPlus } from 'react-icons/fa';
import { useCotizadorStateContext } from '@/context/CotizadorGlobalContext';
import ProductCard from './ProductCard';

const StockGallery = () => {
    const { ingredients } = useCotizadorStateContext()
    const { filterParam, itemSearch } = useStockStateContext()
    const { setShowProductModal } = useStockActionsContext()
    const { productsData } = useFilterTable(filterParam, itemSearch, ingredients)
  return (
    <Grid templateColumns={['1fr', 'repeat(4, 1fr)']} gap={4} mt={4}>
    {
      productsData && productsData.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))
    }
  </Grid>
  )
}

export default StockGallery