import CommonAlert from '@/components/modals/CommonAlert'
import { CTZ_STATUSES, CTZ_STATUS_VALUE } from '@/constant/ctzStatus'
import { useCotizadorStateContext } from '@/context/CotizadorGlobalContext'
import useGetCtz from '@/hooks/useGetCtz'
import useOrderDetails from '@/hooks/useOrderDetails'
import { createNewCtz } from '@/services/cotizaciones'
import { CommonAlertProps } from '@/types/alerts'
import { CtzGlobalProp } from '@/types/ctz'
import { Expenses } from '@/types/extraExpenses'
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
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [orderFinished, setOrderFinished] = useState<boolean>(false)
    const { loading, orderInfo } = useOrderDetails(order)
    const router = useRouter()    
    const dateNow = new Date()
    useEffect(() => {
        if(ctz && router.query.cid){
            const ctzData = ctz.filter((eachCtz) => (eachCtz.id === router.query.cid))
            setOrder(ctzData[0])
        }
    },[ctz])

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
                <Heading as='h2' w='50%' textAlign='center'>Detalles de preparación de tu pedido</Heading>
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

            {
                order?.cake &&
                <AccordionItem>
                    <AccordionButton py={4}>
                        <Box as="span" fontWeight='bold' flex='1' textAlign='left'>
                            Detalles de la receta principal ({orderInfo?.cake.name})
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} fontSize='sm'>
                        <TableContainer>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>Ingrediente</Th>
                                        <Th>Cantidad</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        orderInfo?.cake?.ingredients.map((eachIngredient:RecipeIngredient, index:number) => (
                                            <Tr key={index}>
                                                <Td>{eachIngredient.name}</Td>
                                                <Td>{eachIngredient.amount}({eachIngredient.unity})</Td>
                                            </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </AccordionPanel>
                </AccordionItem>
            }

            {
                order?.filling &&
                <AccordionItem>
                    <AccordionButton py={4}>
                        <Box as="span" fontWeight='bold' flex='1' textAlign='left'>
                            Detalles del relleno ({orderInfo?.filling.name})
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} fontSize='sm'>
                        <TableContainer>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>Ingrediente</Th>
                                        <Th>Cantidad</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        orderInfo?.filling?.ingredients.map((eachIngredient:RecipeIngredient, index:number) => (
                                            <Tr key={index}>
                                                <Td>{eachIngredient.name}</Td>
                                                <Td>{eachIngredient.amount}({eachIngredient.unity})</Td>
                                            </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </AccordionPanel>
                </AccordionItem>
            }

            {
                order?.coverage &&
                <AccordionItem>
                    <AccordionButton py={4}>
                        <Box as="span" fontWeight='bold' flex='1' textAlign='left'>
                            Detalles de la cobertura ({orderInfo?.coverage.name})
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} fontSize='sm'>
                        <TableContainer>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>Ingrediente</Th>
                                        <Th>Cantidad</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        orderInfo?.coverage?.ingredients.map((eachIngredient:RecipeIngredient, index:number) => (
                                            <Tr key={index}>
                                                <Td>{eachIngredient.name}</Td>
                                                <Td>{eachIngredient.amount}({eachIngredient.unity})</Td>
                                            </Tr>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </AccordionPanel>
                </AccordionItem>
            }

            {
                order?.extra &&
                <AccordionItem>
                    <AccordionButton py={4}>
                        <Box as="span" fontWeight='bold' flex='1' textAlign='left'>
                            Detalles de los extras
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} fontSize='sm'>
                        {
                            order.extra.map((eachExtra:Expenses, index:number) => (
                                <Text key={index}>
                                    {eachExtra.name}
                                </Text>
                            ))
                        }
                    </AccordionPanel>
                </AccordionItem>
            }
        </Accordion>
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
