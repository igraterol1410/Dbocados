import React from 'react'
import  { Grid } from '@chakra-ui/react'
import DbocadosLogo from '@/assets/logo.svg'
import Image from 'next/image'

const Dashboard = () => {
  return (
    <Grid 
    alignItems='center' 
    justifyContent='center'            
    h={['100%','calc(100vh - 50px)']}
    w='full'
    >
        <Image
        src={DbocadosLogo}
        alt='Logo dbocados'
        />
    </Grid>
  )
}

export default Dashboard
