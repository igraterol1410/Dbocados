/* eslint-disable react/jsx-key */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Flex, Grid, GridItem, Heading, Input, Text } from '@chakra-ui/react'
import PageContainer from '@/components/layout/PageContainer'
import Image from 'next/image'
import Ilustracion from '@/assets/configuracion.svg'
import Goal from '@/assets/goal.svg'
import SuccessIcon from '@/assets/success-2.svg'
import { setBussinesGoal } from '@/services/goal'
import useUserInfo from '@/hooks/useUserInfo'
import Link from 'next/link'
import useGetGoal from '@/hooks/useGetGoal'
import { FaCashRegister, FaCog, FaFlag, FaListUl, FaStar } from 'react-icons/fa'
import { updateUser } from '@/services/users'
import { useCotizadorActionsContext, useCotizadorStateContext } from '@/context/CotizadorGlobalContext'
import { useRouter } from 'next/router'

const Configuracion = () => {
    const [showList, setShowList] = useState<number>(0)
    const titleProcess = [
        'Configuración',
        'Agrega ingredientes',
        'Gastos indirectos',
        'Meta mensual de pedidos',
        '¡Buenisimo!'
    ]

    const titleIcons = [
        {
            icon: <FaCog />,
        },
        {
            icon: <FaListUl />,
        },
        {
            icon: <FaCashRegister />,
        },
        {
            icon: <FaFlag />,
        },
        {
            icon: <FaStar />,
        }
    ]
  return (
    <PageContainer title='Configuración' titleIcon={<FaCog />}>
        <Grid 
        templateColumns={['1fr', '1fr 1fr 1fr']}
        gap={4}
        >
            <GridItem>
                <Card rounded={20}>
                    <CardHeader>
                        <Heading size='md'>Gastos indirectos</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>Guarda los gastos de servicios e implementes que tienes al mes</Text>
                    </CardBody>
                    <CardFooter>
                        <Link href='configuracion/gastos-indirectos'>
                            <Button>Configurar</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem>
                <Card rounded={20}>
                    <CardHeader>
                        <Heading size='md'>Meta mensual</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>Establece una meta de pedidos que estimas tener al mes</Text>
                    </CardBody>
                    <CardFooter>
                        <Link href='configuracion/meta-mensual'>
                            <Button>Configurar</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem>
                <Card rounded={20}>
                    <CardHeader>
                        <Heading size='md'>Tus ingredientes</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text>Guarda todos los ingredientes que usualmente utilizas en tus recetas</Text>
                    </CardBody>
                    <CardFooter>
                        <Link href='inventario'>
                            <Button>Configurar</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </GridItem>
        </Grid>
    </PageContainer>
  )
}

interface introduccionProps {
    showList:number,
    setShowList: Dispatch<SetStateAction<number>>
}

const Introduccion:React.FC<introduccionProps> = ({showList, setShowList}) => {
    const router = useRouter()

    const handleInformation = () => {
        setShowList(1)
    }

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
                                ¡Estás a un paso de comenzar a crear recetas!
                            </Heading>
                            <Text>
                                Antes de continuar, vamos a personalizar tu cotizador. Esto implica ingresar algunos precios referenciales. Esta configuración te permitirá crear cotizaciones precisas en el futuro. Empecemos.
                            </Text>
                        </Box>
                </Box>
                <Button onClick={() => {router.back()}}>back</Button>
                <Flex direction='column' h='100%' justifyContent='space-between'>
                    <Button 
                    w='full' 
                    bg='pinkPrimary' 
                    color='white' 
                    mt={6}
                    onClick={handleInformation}
                    >
                        ¡Entendido!
                    </Button>
                </Flex>
            </Grid>
        </Box>
    )
}

export default Configuracion
