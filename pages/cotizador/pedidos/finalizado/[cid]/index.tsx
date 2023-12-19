import CommonAlert from '@/components/modals/CommonAlert'
import { CTZ_STATUSES, CTZ_STATUS_VALUE } from '@/constant/ctzStatus'
import { useCotizadorStateContext } from '@/context/CotizadorGlobalContext'
import useCtzPrice from '@/hooks/useCtzPrice'
import useGetCtz from '@/hooks/useGetCtz'
import useOrderDetails from '@/hooks/useOrderDetails'
import { createNewCtz } from '@/services/cotizaciones'
import { CommonAlertProps } from '@/types/alerts'
import { CtzGlobalProp } from '@/types/ctz'
import { Expenses } from '@/types/extraExpenses'
import { Ingredients } from '@/types/ingredients'
import { RecipeIngredient } from '@/types/recipe'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Center, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const index = () => {    
    const { ctz, loading:  ctzLoading } = useGetCtz()
    const { uid } = useCotizadorStateContext()
    const [order, setOrder] = useState<CtzGlobalProp>()
    const [configAlert, setConfigAlert] = useState<CommonAlertProps | null>(null)
    const [orderIngredients, setOrderIngredients] = useState<RecipeIngredient[]>([])
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [orderFinished, setOrderFinished] = useState<boolean>(false)
    const { loading, orderInfo } = useOrderDetails(order)
    const { cyzInfo, loading: ctzInfoLoading } = useCtzPrice(order?.workHand, order?.cake, order?.coverage, order?.filling, order?.extra, order?.people, order?.earn)
    const router = useRouter()    
    const dateNow = new Date()
    useEffect(() => {
        if(ctz && router.query.cid){
            const ctzData = ctz.filter((eachCtz) => (eachCtz.id === router.query.cid))
            setOrder(ctzData[0])
        }
    },[ctz])

    useEffect(() => {
        if(orderInfo){
            let totalIngredients:RecipeIngredient[] = []
            if(orderInfo?.cake?.ingredients.length > 0){
                orderInfo?.cake?.ingredients.forEach((ingredient) => {
                    const isDuplicated = totalIngredients.filter((eachIngredient:RecipeIngredient) => (eachIngredient.productRef === ingredient.productRef))
                    if(isDuplicated.length === 0){
                        totalIngredients.push(ingredient)
                    } else {
                        const newIngredientAmount = totalIngredients.map((eachIng) => 
                        eachIng.productRef === ingredient.productRef ?
                        {
                            ...eachIng,
                            amount: eachIng.amount + ingredient.amount
                        }
                        : eachIng
                        )
                        totalIngredients = newIngredientAmount
                    }
                });
            }
            if(orderInfo?.coverage?.ingredients.length > 0){
                orderInfo?.coverage?.ingredients.forEach((ingredient) => {
                    const isDuplicated = totalIngredients.filter((eachIngredient:RecipeIngredient) => (eachIngredient.productRef === ingredient.productRef))
                    if(isDuplicated.length === 0){
                        totalIngredients.push(ingredient)
                    } else {
                        const newIngredientAmount = totalIngredients.map((eachIng) => 
                        eachIng.productRef === ingredient.productRef ?
                        {
                            ...eachIng,
                            amount: eachIng.amount + ingredient.amount
                        }
                        : eachIng
                        )
                        totalIngredients = newIngredientAmount
                    }
                });
            }
            if(orderInfo?.filling?.ingredients.length > 0){
                orderInfo?.filling?.ingredients.forEach((ingredient) => {
                    const isDuplicated = totalIngredients.filter((eachIngredient:RecipeIngredient) => (eachIngredient.productRef === ingredient.productRef))
                    if(isDuplicated.length === 0){
                        totalIngredients.push(ingredient)
                    } else {
                        const newIngredientAmount = totalIngredients.map((eachIng) => 
                        eachIng.productRef === ingredient.productRef ?
                        {
                            ...eachIng,
                            amount: eachIng.amount + ingredient.amount
                        }
                        : eachIng
                        )
                        totalIngredients = newIngredientAmount
                    }
                });
            }
            setOrderIngredients(totalIngredients)
        }
    },[orderInfo])

    const hiddeAlert = () => {
        setShowAlert(false)
        setConfigAlert(null)
    }

    const cancelOrder = () => {
        const ctzEdited = ctz.map((eachCtz: CtzGlobalProp) =>
            eachCtz.id === order?.id
            ? {
                ...order,
                status: CTZ_STATUS_VALUE[3],
                updated_at: dateNow
            }
            : eachCtz
        )
        createNewCtz(ctzEdited, uid).then(() => {
            hiddeAlert()
            router.push(`/cotizador/`)
        })
    }

    const finishOrder = () => {
        const ctzEdited = ctz.map((eachCtz: CtzGlobalProp) =>
            eachCtz.id === order?.id
            ? {
                ...order,
                status: CTZ_STATUS_VALUE[2],
                updated_at: dateNow
            }
            : eachCtz
        )
        createNewCtz(ctzEdited, uid).then(() => {
            hiddeAlert()
            router.push(`/cotizador/pedidos/finalizado/${order?.id}`)
        })
    }

    const handleCancel = () => {
        setShowAlert(true)
        setConfigAlert({
            title: '¿Deseas cancelar pedido?',
            text: 'Recuerda que puedes volver a realizar este pedido cuando desees',
            action: cancelOrder,
            buttonText: 'Cancelar pedido',
            buttonColor: 'red'
        })
    }

    const handleFinish = () => {
        setShowAlert(true)
        setConfigAlert({
            title: '¿Has finalizado este pedido?',
            text: 'Recuerda actualizar tu inventario de productos',
            action: finishOrder,
            buttonText: 'Finalizar pedido',
            buttonColor: 'green'
        })
    }

  return (
    <Box 
    p={4}
    display='grid'
    gridTemplateRows='auto 1fr'
    >
        <Box>
            <Center>
                <Heading as='h2' w='50%' textAlign='center'>Pedido finalizado</Heading>
            </Center>           
        </Box>
        <Accordion 
        defaultIndex={[0,1]} 
        allowMultiple 
        mt={5}
        rounded={12}
        shadow='xl'
        >
            <AccordionItem>
                <h2>
                <AccordionButton py={4}>
                    <Box as="span" fontWeight='bold' flex='1' textAlign='left'>
                    Detalles del pedido
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontSize='sm'>
                <Text><b>Nombre del pedido: </b>{order?.name}</Text>
                <Text><b>Número de porciones: </b>{order?.people}</Text>
                <Text><b>Estado: </b>{CTZ_STATUSES[CTZ_STATUS_VALUE.indexOf(order?.status || '')]?.label || CTZ_STATUSES[0].label}</Text>
                <Text><b>Fecha de creación: </b>{order?.created_at.split('T')[0]}</Text>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
        <Box>
            {
                orderIngredients && orderIngredients?.length > 0 && orderIngredients?.map((eachIngredient, index) => (
                    <Text key={index}>{eachIngredient.name}</Text>
                ))
            }
        </Box>
        <Box mt={5} display='flex' gap={4}>
            <Link href='/cotizador'>
                <Button variant='outline'>
                    Volver
                </Button>
            </Link>
            <Button onClick={handleCancel}>
                Cancelar pedido
            </Button>
            <Button onClick={handleFinish}>
                Finalizar pedido
            </Button>
        </Box>
        <CommonAlert configAlert={configAlert} show={showAlert} setShow={hiddeAlert} />
    </Box>
  )
}

export default index