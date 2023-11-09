import { Spinner } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
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
}

export default Loader
