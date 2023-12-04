import { Box, Button, Center, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Ilustracion from '@/assets/congrats.svg'

const Save = () => {
  return (
    <Box h='100%' w='full' bg='#fcfcfc' borderRadius={[8, 12]} p={6}>
        <Grid 
        templateRows={['1fr auto']}
        gap={6}
        h='full'
        alignItems='center'
        >
          <Box>
            <Center>
                <Image
                src={Ilustracion}
                alt='Logo dbocados'
                width={200}
                />
            </Center>
            <Box
            w={['85%', '60%']}
            marginInline='auto'
            textAlign='center'
            >
                <Heading as='h3' mb={6}>
                  ¡Felicitaciones!
                </Heading>
                <Text>
                  Tu pedido fue aprobado, ahora manos a la obra!
                </Text>
                <Text>
                  Aquí te dejaremos los detalles de lo que necesitas para realizar tu pedido.
                </Text>
            </Box>
          </Box>
            <Flex direction='column' h='100%' justifyContent='space-between' alignItems='center'>
                <Link href='/cotizador'>
                  <Button 
                  w='full' 
                  bg='pinkPrimary' 
                  color='white' 
                  mt={6}
                  >
                      Ver detalles
                  </Button>
                </Link>
            </Flex>
        </Grid>
      </Box>
  )
}

export default Save
