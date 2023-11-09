import { Box } from '@chakra-ui/react'
import React from 'react'

const Layout = ({ children }:{ 
  children: React.ReactNode 
  }) => {
  return (
    <Box minH='100vh'>
      { children }
    </Box>
    
  )
}

export default Layout
