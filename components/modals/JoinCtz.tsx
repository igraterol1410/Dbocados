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
        scrollBehavior='inside'
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
                    <Box marginInline='auto' position='relative' w={['100px', '150px']}>
                        <Image
                        src={Ilustracion}
                        alt='Logo dbocados'
                        />
                    </Box>
                    <Box
                    w={['85%', '60%']}
                    marginInline='auto'
                    textAlign='center'
                    >
                        <Heading as='h3' mb={6}>
                            ¡Estás muy cerca de tener acceso!
                        </Heading>
                        <Text>
                            Escríbenos para mas información.
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
                      bg='pinkPrimary' 
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
                      variant='outline'
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
