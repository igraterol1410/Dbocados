/* eslint-disable react/jsx-key */
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Grid, Heading, Input, Text } from '@chakra-ui/react'
import PageContainer from '@/components/layout/PageContainer'
import Image from 'next/image'
import Ilustracion from '@/assets/configuracion.svg'
import Goal from '@/assets/goal.svg'
import SuccessIcon from '@/assets/success-2.svg'
import SetupCotizador from '@/components/layout/cotizador/configuracion/ConfigurationList'
import ExtraExpenses from '@/components/layout/cotizador/configuracion/ExtraExpenses'
import { setBussinesGoal } from '@/services/goal'
import useUserInfo from '@/hooks/useUserInfo'
import Link from 'next/link'
import useGetGoal from '@/hooks/useGetGoal'
import { FaCashRegister, FaCog, FaFlag, FaListUl, FaStar } from 'react-icons/fa'
import { updateUser } from '@/services/users'
import { useCotizadorActionsContext, useCotizadorStateContext } from '@/context/CotizadorGlobalContext'

const Configuracion = () => {
    const [showList, setShowList] = useState<number>(0)
    const configurationProcess = [
        <Introduccion showList={showList} setShowList={setShowList} />,
        <SetupCotizador showList={showList} setShowList={setShowList} />,
        <ExtraExpenses showList={showList} setShowList={setShowList} />,
        <MonthlyGoal showList={showList} setShowList={setShowList} />,
        <Success />
    ]
    
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
    <PageContainer title={titleProcess[showList]} titleIcon={titleIcons[showList].icon}>
        {
            configurationProcess[showList]
        }
    </PageContainer>
  )
}

interface introduccionProps {
    showList:number,
    setShowList: Dispatch<SetStateAction<number>>
}

const Introduccion:React.FC<introduccionProps> = ({showList, setShowList}) => {

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

const Success = () => {

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
                        src={SuccessIcon}
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
                                ¡Finalizaste la configuración de forma exitosa!
                            </Heading>
                            <Text>
                                Ahora podras crear tus recetas de forma mas facil!
                            </Text>
                        </Box>
                </Box>
                <Flex direction='column' h='100%' justifyContent='space-between'>
                    <Link href='/cotizador'>
                        <Button 
                        w='full' 
                        bg='pinkPrimary' 
                        color='white' 
                        mt={6}
                        >
                            ¡Finalizar!
                        </Button>
                    </Link>
                </Flex>
            </Grid>
        </Box>
    )
}

interface GoalProps {
    showList:number,
    setShowList: Dispatch<SetStateAction<number>>
}

const MonthlyGoal:React.FC<GoalProps> = ({showList, setShowList}) => {
    const [monthlyGoal, setMonthlyGoal] = useState<number>(0)
    const { uid, userInfo } = useCotizadorStateContext()
    const { setGlobalUser } = useCotizadorActionsContext()
    const { goal } = useGetGoal()

    useEffect(() => {
        if(goal){
            setMonthlyGoal(goal)
        }
    },[goal])

    const handleInformation = () => {
        setBussinesGoal(monthlyGoal, uid).then(() => {
            const payload = {...userInfo, hasGoal: true}
            updateUser(payload, uid).then(() => {
                setGlobalUser(payload)
                setShowList(showList + 1)
            })
        })
    }

    return (
        <Box h='100%' w='full' bg='#fcfcfc' borderRadius={[8, 12]} p={6}>
            <Grid 
            templateRows={['150px 1fr']}
            gap={6}
            h='full'
            >
                <Center>
                    <Image
                    src={Goal}
                    alt='Logo dbocados'
                    width={200}
                    />
                </Center>
                <Flex direction='column' h='100%' justifyContent='space-between'>
                    <Box
                    w={['85%', '60%']}
                    marginInline='auto'
                    textAlign='center'
                    >
                        <Heading as='h3' mb={6}>
                            ¿Cuantos pedidos planeas recibir este mes?
                        </Heading>
                        <Text>
                            En base a esta cantidad de pedidos se calculará el gasto que realizarás por pedido!
                        </Text>
                        <Flex gap={4} mt={6} alignItems='center' w='60%' marginInline='auto'>
                            <Input
                            marginInline='auto'
                            size='lg'
                            textAlign='right'
                            type='number'
                            value={monthlyGoal}
                            onChange={(e) => setMonthlyGoal(parseFloat(e.target.value))}
                            /> pedidos/mes
                        </Flex>
                    </Box>
                    <Button 
                    w='full' 
                    bg='pinkPrimary' 
                    color='white' 
                    mt={6}
                    isDisabled={monthlyGoal <= 0}
                    onClick={handleInformation}
                    >
                        Guardar cambios
                    </Button>
                </Flex>
            </Grid>
        </Box>
    )
}

export default Configuracion
