import React, {useState} from 'react'
import { Box } from '@chakra-ui/react'
import NavbarDashboard from '@/components/layout/NavbarDashboard'
import DashboardAside from '@/components/layout/DashboardAside'

const DashboardLayout = ({ children }:{children: React.ReactNode}) => {        
    const [asideOpen, setAsideOpen] = useState(true)
  return (
    <Box
    position='relative'
    h='100vh'
    w='full'
    >
        <NavbarDashboard asideOpen={asideOpen} setAsideOpen={setAsideOpen} />
        <DashboardAside asideOpen={asideOpen} />
        <Box h='full' w='full' pl={asideOpen ? '261px' : '20px'} pt='50px' bg='rgb(240, 240, 240)'>
          {children}
        </Box>
    </Box>
  )
}

export default DashboardLayout
