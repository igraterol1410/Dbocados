import React from 'react'
import { Box, Button, Flex } from '@chakra-ui/react'
import DbocadosLogo from '@/assets/logo.svg'
import Image from 'next/image'

const Navbar = () => {
  return (
    <Flex
    px={['1rem', '2rem']}
    py={4}
    justifyContent='space-between'
    gap={4}
    >
      <Box>
        <Image 
        src={DbocadosLogo} 
        alt='logo'
        style={{height: '40px'}}
        />
      </Box>
      <Flex>
        <Button>Inicio de sesión</Button>
        <Button>Registro</Button>
      </Flex>
    </Flex>
  )
}

export default Navbar
