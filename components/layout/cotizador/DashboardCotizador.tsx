import React, {useState} from 'react'
import { Box, keyframes } from '@chakra-ui/react'
import NavbarDashboard from '@/components/layout/NavbarDashboard'
import CotizadorAside from './AsideCotizador'

const CotizadorLayout = ({ children }:{children: React.ReactNode}) => {        
    const [asideOpen, setAsideOpen] = useState(true)
    const openAside = keyframes`
        0% { padding-left: 64px }
        100% { padding-left: 300px }
    `
    const openAsideAction = `${openAside} 1.5s ease-in-out `
    const closeAside = keyframes`
        0% { padding-left: 300px }
        100% { padding-left: 64px }
    `
    const closeAsideAction = `${closeAside} 1.5s ease-in-out `
    const appearText = keyframes`
        0% { opacity: 0 }
        50% { opacity: 0 }
        100% { opacity: 1 }
    `
    const appearTextAction = `${appearText} 1.5s ease-in-out `
    const disappearText = keyframes`
        0% { opacity: 1 }
        100% { opacity: 0 }
    `
    const disappearTexttAction = `${disappearText} 1.5s ease-in-out `
  return (
    <Box
    position='relative'
    h='100vh'
    w='full'
    >
        <NavbarDashboard asideOpen={asideOpen} setAsideOpen={setAsideOpen} />
        <CotizadorAside asideOpen={asideOpen} />
        <Box 
        h='full' 
        w='full' 
        animation={['' ,asideOpen ? openAsideAction : closeAsideAction]}
        pl={[0 ,asideOpen ? '300px' : '64px']} 
        pt='50px' 
        bg='rgb(240, 240, 240)'
        >
            {children}
        </Box>
    </Box>
  )
}

export default CotizadorLayout