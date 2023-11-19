import PageContainer from '@/components/layout/PageContainer'
import FilterProducts from '@/components/layout/cotizador/stock/FilterProducts'
import StockGallery from '@/components/layout/cotizador/stock/StockGallery'
import StockTable from '@/components/layout/cotizador/stock/StockTable'
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
            </Box>
            {/* <StockTable /> */}
        </StockTableComponent>
    </PageContainer>
  )
}

export default index