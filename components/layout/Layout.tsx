import { Box } from '@chakra-ui/react'
import React from 'react'
import Navbar from './Navbar'

const Layout = ({ children }:{ 
  children: React.ReactNode 
  }) => {
  return (
    <Box minH='100vh'>
      <Navbar />
      { children }
    </Box>
    
  )
}

export default Layout
