import { Box, Button, Center, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import Ilustracion from '@/assets/empty.svg'
import Link from 'next/link'

const EmptyState = ({option}:{option:string}) => {
  return (
    <Box>
        <Center>
            <Box position='relative' w={['100px', '150px']}>
                <Image
                src={Ilustracion}
                alt='Logo dbocados'
                />
            </Box>
        </Center>
        <Box
        w={['85%', '60%']}
        marginInline='auto'
        textAlign='center'
        >
            <Heading as='h3' mb={6} fontSize={['20px', '24px']}>
                Ahora no cuentas con {option}
            </Heading>
            <Text>
                Si necesitas {option}, crea una nueva receta aquí
            </Text>
            <Link href='/cotizador/crear-receta'>
                <Button>Crear receta</Button>
            </Link>
        </Box>                   
    </Box>
  )
}

export default EmptyState
