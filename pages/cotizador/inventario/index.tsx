import PageContainer from '@/components/layout/PageContainer'
import FilterProducts from '@/components/layout/cotizador/stock/FilterProducts'
import StockGallery from '@/components/layout/cotizador/stock/StockGallery'
import StockProductForm from '@/components/modals/StockProductForm'
import StockTableComponent from '@/context/StockComponent'
import { Box } from '@chakra-ui/react'
import React from 'react'
import { FaDatabase } from 'react-icons/fa'

const index = () => {
  return (
    <PageContainer title={'Inventario'} titleIcon={<FaDatabase />}>
        <StockTableComponent>
            <Box>
                <FilterProducts />
                <StockGallery />
                <StockProductForm />
            </Box>
        </StockTableComponent>
    </PageContainer>
  )
}

export default index