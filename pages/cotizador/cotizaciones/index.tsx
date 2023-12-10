import React, { useEffect, Dispatch, SetStateAction, useState } from 'react'
import { Box, Button, Center, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import PageContainer from '@/components/layout/PageContainer'
import Image from 'next/image'
import Ilustracion from '@/assets/cotizaciones.svg'
import Link from 'next/link'
import { FaPlus, FaShoppingBag } from 'react-icons/fa'
import useGetCtz from '@/hooks/useGetCtz'
import Loader from '@/components/layout/Loader'
import CtzCard from '@/components/layout/cotizador/cotizaciones/CtzCard'
import { CtzGlobalProp } from '@/types/ctz'
import { useCotizadorActionsContext, useCotizadorStateContext } from '@/context/CotizadorGlobalContext'

const Cotizaciones = () => {
    const { ctz, loading } = useGetCtz()
    const { setCtzs } = useCotizadorActionsContext()
    const { ctzs } = useCotizadorStateContext()

    useEffect(() => {
        if(ctz){
          setCtzs(ctz)
          console.log(ctz)
        }
    }, [ctz])
    
  return (
    <PageContainer title={'Cotizaciones'} titleIcon={<FaShoppingBag />}>
        {
            ctzs.length === 0 && !loading
            ? (
                <Introduccion />
            )
            : (
                <GridItem
                borderRadius={[5, 10]}
                px={[3, 5]}
                py={[2, 4]}
                bg='#fcfcfc'
                display='grid'
                h='100%'
                gridTemplateRows={['auto 1fr auto']}
                >
                    <Text fontWeight='bold' textAlign='center'>
                        Tus Cotizaciones
                    </Text>
                    <Grid templateColumns={['1fr', '1fr']} gap={4} mt={4}>
                        {
                        loading
                        ? (
                            <Box position='relative'>
                            <Loader />
                            </Box>
                        )
                        : (
                            <>
                            {
                                ctzs && ctzs.length > 0
                                ? (
                                <Grid alignSelf='self-start' templateColumns={['1fr', '1fr 1fr 1fr']} gap={4} mt={4}>                  
                                    {
                                    ctzs && ctzs.map((eachCtz:CtzGlobalProp, index:number) => (
                                        <CtzCard key={index} ctz={eachCtz} />
                                    ))
                                    }
                                </Grid>
                                )
                                : (
                                <Box>
                                    <Center>
                                    <Image
                                    src={Ilustracion}
                                    alt='Empty state'
                                    width={100}
                                    />
                                    </Center>
                                    <Center>
                                    <Text>Aún no tienes Cotizaciones, crea la primera aquí</Text>
                                    </Center>
                                </Box>
                                ) 
                            }
                            </>
                        )
                        }
                    </Grid>
                    <Center>
                        <Link href='/cotizador/crear-cotizacion'>
                            <Button 
                            bg='pinkPrimary'
                            color='white'
                            _hover={{
                                bg:'pink.400'
                            }}
                            mt={4}
                            leftIcon={<FaPlus />}
                            >
                            Crear Cotización
                            </Button>
                        </Link>
                    </Center>
                </GridItem>
            )
        }
    </PageContainer>
  )
}

const Introduccion = () => {

    return (
        <Box w='full' h='full' bg='#fcfcfc' borderRadius={[8, 12]} p={6} marginY='auto'>
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
                        alt='Empty state'
                        width={100}
                        />
                    </Center>
                    <Center>
                        <Text>Aún no tienes cotizaciones, crea la primera aquí</Text>
                    </Center>
                </Box>
                <Flex direction='column' h='100%' justifyContent='center' marginInline='auto'>
                    <Link href='crear-cotizacion'>
                      <Button 
                      bg='pinkPrimary' 
                      _hover={{bg: 'pink.400'}}
                      color='white' 
                      mt={6}
                      leftIcon={<FaPlus />}
                      >
                          Crear una cotización
                      </Button>
                    </Link>
                </Flex>
            </Grid>
        </Box>
    )
}

export default Cotizaciones