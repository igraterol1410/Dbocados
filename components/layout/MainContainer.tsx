import { Box } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import React from 'react'
import DashboardLayout from './DashboardLayout'
import CotizadorLayout from './cotizador/DashboardCotizador'
import Seo from '../seo/Seo'
import CotizadorGlobalComponent from '@/context/CotizadorGlobalComponent'

const MainContainer = ({ children }:{ children: React.ReactNode }) => {
    const pathname = usePathname()
    if (pathname?.includes('dashboard')) {
        return (
          <Seo
          title='Panel'
          description='Panel de DBocados para realizar operaciones más confiables'
          >
            <DashboardLayout>
              {children}
            </DashboardLayout>
          </Seo>
        )
      }
    if (pathname?.includes('cotizador')) {
        return (
          <CotizadorGlobalComponent>
            <Seo
            title='Cotizador'
            description='Panel de DBocados para realizar operaciones más confiables'
            >
              <CotizadorLayout>
                {children}
              </CotizadorLayout>
            </Seo>
          </CotizadorGlobalComponent>
        )
      }
  return (
    <Box>
        {children}
    </Box>
  )
}

export default MainContainer
