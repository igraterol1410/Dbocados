import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import DbocadosLogo from '@/assets/logo.svg'
import Image from 'next/image'
// import Link from 'next/link'

const Navbar = () => {
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
    // bg='white'
    // boxShadow='dark-lg'
    >
      <Box>
        <Image 
        src={DbocadosLogo} 
        height={40}
        alt='logo'
        />
      </Box>
      {/* <Flex
      gap={4}>
      <Link href="/login">
        <Button variant='outline'>Inicio de sesión</Button>
      </Link>
      <Link href="/signup">
        <Button variant='outline'>Registro</Button>
      </Link>
      </Flex> */}
    </Flex>
  )
}

export default Navbar
