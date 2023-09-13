import React from 'react'
import { Box, Flex, Button } from '@chakra-ui/react'
import DbocadosLogo from '@/assets/logo.svg'
import Image from 'next/image'
import { logOut } from '@/services/auth'
import { useRouter } from 'next/router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { firebaseApp } from '@/firebase'

const NavbarDashboard = () => {  
    const auth = getAuth(firebaseApp);
    const router = useRouter()
    const handleLogOut = () => {
        logOut()
    }

    onAuthStateChanged(auth, (user) => {
        if(!user){
            router.push('/')
        }
      })

  return (
    <Flex
    px={['1rem', '2rem']}
    py={4}
    justifyContent='space-between'
    gap={4}
    position='fixed'
    w='full'
    top={0}
    zIndex={1000}
    >
      <Box>
        <Image 
        src={DbocadosLogo} 
        height={40}
        alt='logo'
        />
      </Box>
      <Flex
      gap={4}>
        <Button variant='outline' onClick={handleLogOut}>Cerrar sesión</Button>
      </Flex>
    </Flex>
  )
}

export default NavbarDashboard
