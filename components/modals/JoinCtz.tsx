import useUserInfo from '@/hooks/useUserInfo'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Flex,
    Button,
    Text,
    Grid,
    Box,
    Center,
    Heading,
  } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Ilustracion from '@/assets/no-access.svg'
import { useCotizadorStateContext } from '@/context/CotizadorGlobalContext'

const JoinCtz = () => { 
    const { ctzUser, userLoading } = useCotizadorStateContext()
    return (
        <Modal 
        isCentered 
        size='5xl' 
        isOpen={!ctzUser && !userLoading} 
        onClose={()=>{}} 
        closeOnEsc={false} 
        closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalBody py='4rem'>
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
                            ¡Estás muy cerca de tener acceso!
                        </Heading>
                        <Text>
                            Lamentablemente, parece que no tienes acceso a esta sección de la plataforma en este momento. No te preocupes, estamos aquí para ayudarte a desbloquear esta función y llevarte un paso más cerca de tus objetivos. Puedes ponerte en contacto con nuestro equipo de soporte para obtener acceso o, si lo prefieres, simplemente regresar a la página anterior para explorar otras áreas de la plataforma. Estamos ansiosos por ayudarte a tener una experiencia increíble.
                        </Text>
                    </Box>
                </Box>
                <Flex 
                w={['90%', '50%']} 
                marginInline='auto'
                direction='column' 
                h='100%' 
                justifyContent='space-between'
                >
                    <a target='_blank' href='https://wa.me/584241411047'>
                      <Button 
                      w='full' 
                      bg='#e80297' 
                      color='white' 
                      mt={6}
                      >
                          Contáctanos
                      </Button>
                    </a>
                    <Link href='/dashboard'>
                      <Button 
                      w='full'
                      mt={6}
                      >
                          Regresar
                      </Button>
                    </Link>
                </Flex>
            </Grid>
            </ModalBody>
          </ModalContent>
        </Modal>
    )
}

export default JoinCtz
