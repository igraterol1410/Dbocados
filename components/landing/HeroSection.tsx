import { Box, Button, Center, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import DBocadosBg from '@/assets/isaid.svg'
import Image from 'next/image'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <Box
    h='100vh'
    w='full'
    position='relative'
    >
        <Box
        position='absolute'
        w='full'
        h='full'
        top={0}
        left={0}
        zIndex={1000}
        mt='72px'
        py={6}
        px={['1.5rem','4rem']}
        >
          <Grid 
          templateColumns={['1fr','70% 1fr']} 
          h='100%' 
          mt='-72px'
          alignContent='center'
          >
            <GridItem>
              <Heading mb={0} as='h1' fontSize={['1.75rem','2.9rem']} color='white'>Conviértete en un profesional de la repostería con nuestros cursos.</Heading>
              <br />
              <Text mb={0} color='white'>Te llevamos paso a paso para que logres esa meta tan importante</Text>
              <Link href="/cursos-virtuales/CubiertaChocolate">
                <Button 
                alignSelf='flex-end' 
                bg='pink.500' 
                color='white' 
                size='lg' 
                mt={6}>
                  Inscríbete aquí
                </Button>
              </Link>
            </GridItem>
            <GridItem>
            </GridItem>
          </Grid>
        </Box>
        <Box 
        bg='rgba(0, 0, 0, .5)'
        position='absolute'
        left={0}
        top={0}
        zIndex={100}
        h='100%'
        w='full'
         />
        <Box
        position='absolute'
        top={0}
        left={0}
        zIndex={10}
        h='100%'
        >
            <Image
            alt="Imagen principal de D'Bocados"
            src={DBocadosBg}
            style={{height: '100%', objectFit:'cover', opacity:'.8'}}
            />
        </Box>
    </Box>
  )
}

export default HeroSection
