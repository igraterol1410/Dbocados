import { Box } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import React from 'react'
import DashboardLayout from './DashboardLayout'

const MainContainer = ({ children }:{ children: React.ReactNode }) => {
    const pathname = usePathname()
    if (pathname.includes('dashboard')) {
        return (
          <DashboardLayout>
            {children}
          </DashboardLayout>
        )
      }
  return (
    <Box>
        {children}
    </Box>
  )
}

export default MainContainer
