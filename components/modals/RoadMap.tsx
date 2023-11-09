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
    useDisclosure,
  } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Ilustracion from '@/assets/road.svg'
import { useCotizadorStateContext } from '@/context/CotizadorGlobalContext'
import { usePathname } from 'next/navigation'

const RoadMap = () => {
    const { ingredients, ingredientsLoading } = useCotizadorStateContext()
    const { onClose, onOpen, isOpen } = useDisclosure()
    const pathname = usePathname()

    useEffect(() => {
        if(ingredients && ingredients.length === 0 && !ingredientsLoading && !pathname.includes('configuracion')){
            onOpen()
        }
    },[ingredients, pathname])

    return (
        <Modal 
        isCentered 
        size='5xl' 
        isOpen={isOpen} 
        onClose={onClose} 
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
                            ¡Estás muy cerca de crear cotizaciones de forma fácil!
                        </Heading>
                        <Text>
                            Solo debes realizar la configuración del cotizador, necesitarás a la mano algunos precios referenciales para esta pequeña tarea, haz clic, en el botón de abajo para iniciar.
                        </Text>
                    </Box>
                </Box>
                <Flex 
                w={['90%', '50%']} 
                marginInline='auto'
                h='100%' 
                justifyContent='center'
                >
                    <Link href='/cotizador/configuracion'>
                      <Button 
                      mt={6}
                      marginInline='auto'
                      bg='pink.500'
                      color='white'
                      _hover={{
                        bg:'pink.400'
                      }}
                      onClick={onClose}
                      >
                          Configrar cotizador
                      </Button>
                    </Link>
                </Flex>
            </Grid>
            </ModalBody>
          </ModalContent>
        </Modal>
    )
}

export default RoadMap
