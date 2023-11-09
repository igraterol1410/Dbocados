import { Box, Button, Center, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React from 'react'
import Ilustracion from '@/assets/empty.svg'
import Link from 'next/link'

const EmptyState = ({option}:{option:string}) => {
  return (
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
