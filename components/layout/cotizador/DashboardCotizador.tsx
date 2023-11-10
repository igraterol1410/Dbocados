import React, {useState} from 'react'
import { Box, keyframes, Spinner } from '@chakra-ui/react'
import NavbarDashboard from '@/components/layout/NavbarDashboard'
import CotizadorAside from './AsideCotizador'
import JoinCtz from '@/components/modals/JoinCtz'
import useUserInfo from '@/hooks/useUserInfo'
import RoadMap from '@/components/modals/RoadMap'
import RecipeDetails from '@/components/modals/RecipeDetails'
import { useCotizadorActionsContext, useCotizadorStateContext } from '@/context/CotizadorGlobalContext'
import CtzDetails from '@/components/modals/CtzDetails'

const CotizadorLayout = ({ children }:{children: React.ReactNode}) => {
    const {asideOpen} = useCotizadorStateContext()
    const {setAsideOpen} = useCotizadorActionsContext()
    const {ctzToShow} = useCotizadorStateContext()
    const { loading } = useUserInfo()
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
    bg='rgb(240, 240, 240)'
    >
        {
            loading
            ? (
                <Spinner
                position='absolute' 
                bottom='50%'
                left='50%'
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='#e80297'
                size='xl'
                />
            )
            : (
                <>
                    <NavbarDashboard asideOpen={asideOpen} setAsideOpen={setAsideOpen} />
                    <CotizadorAside asideOpen={asideOpen} />
                    <Box 
                    h='100%' 
                    w='full' 
                    animation={['' ,asideOpen ? openAsideAction : closeAsideAction]}
                    pl={[0 ,asideOpen ? '300px' : '64px']} 
                    pt='50px'
                    >
                        {children}
                    </Box>
                </>
            )
        }
        <JoinCtz />
        <RoadMap />
        <RecipeDetails />
        {
            ctzToShow &&
            <CtzDetails />
        }
    </Box>
  )
}

export default CotizadorLayout