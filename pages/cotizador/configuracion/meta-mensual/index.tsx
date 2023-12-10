import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Flex, Grid, Heading, Input, Text } from '@chakra-ui/react'
import PageContainer from '@/components/layout/PageContainer'
import Image from 'next/image'
import Goal from '@/assets/goal.svg'
import { setBussinesGoal } from '@/services/goal'
import useGetGoal from '@/hooks/useGetGoal'
import { FaFlag } from 'react-icons/fa'
import { updateUser } from '@/services/users'
import { useCotizadorActionsContext, useCotizadorStateContext } from '@/context/CotizadorGlobalContext'
import { useRouter } from 'next/router'

const MonthlyGoal = () => {
    const router = useRouter()
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
                router.back()
            })
        })
    }

    return (
        <PageContainer title='Meta mensual' titleIcon={<FaFlag />}>
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
        </PageContainer>
    )
}

export default MonthlyGoal
