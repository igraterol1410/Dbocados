import React from 'react'
import { Box, Button, Center, Grid, GridItem, Heading, Text, Flex } from '@chakra-ui/react'
import { BiSolidParty } from 'react-icons/bi'

const Cotizador = () => {
  return (
    <Flex
    direction='column'
    gap={['32px', '64px']}
    px={[2, 6]}
    py={[2, 6]}
    h='full'
    overflowY='scroll'
    position='relative'
    >
      <Heading as='h2' display='flex' alignItems='center' gap={4} >
        Bienvenido a tu cotizador personal <BiSolidParty />
      </Heading>
      <Grid
      templateColumns={['1fr']}
      templateRows='1fr 1fr'
      gap={[3, 5]}
      h='100%'
      >
        <GridItem
        borderRadius={[5, 10]}
        px={[3, 5]}
        py={[2, 4]}
        bg='#fcfcfc'
        >
          <Text fontWeight='bold' textAlign='center'>
            Tus Cotizaciones
          </Text>
          <Button 
          variant='outline' 
          w='full'
          mt={4}
          >
            + Crear Cotización
          </Button>
        </GridItem>
        <GridItem
        borderRadius={[5, 10]}
        px={[3, 5]}
        py={[2, 4]}
        bg='#fcfcfc'
        >
          <Text fontWeight='bold' textAlign='center'>
            Tus Recetas
          </Text>
          <Button 
          variant='outline' 
          w='full'
          mt={4}
          >
            + Crear Receta
          </Button>
        </GridItem>
      </Grid>
      <Button position='fixed' bottom='40px' right='20px' alignSelf='end' justifySelf='self-end'>Crear Cotización</Button>
    </Flex>
  )
}

export default Cotizador
