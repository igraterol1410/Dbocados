/* eslint-disable react-hooks/exhaustive-deps */
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Button,
    Text,
    Box,
    useDisclosure,
    TableContainer,
    Table,
    Tbody,
    Tr,
    Td,
    ModalHeader,
    ModalFooter,
    useToast,
  } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useCotizadorActionsContext, useCotizadorStateContext } from '@/context/CotizadorGlobalContext'
import useCtzPrice from '@/hooks/useCtzPrice'
import Loader from '../layout/Loader'
import { CtzGlobalProp } from '@/types/ctz'
import CtzDelete from './CtzDelete'
import { createNewCtz } from '@/services/cotizaciones'
import Link from 'next/link'
import ElaborateCtz from './ElaborateCtz'
import { useRouter } from 'next/router'
import { CTZ_STATUSES, CTZ_STATUS_VALUE } from '@/constant/ctzStatus'

const CtzDetails = () => {
    const toast = useToast()
    const { ctzToShow, ctzs, uid } = useCotizadorStateContext()
    const { setCtzToShow, setCtzs } = useCotizadorActionsContext()
    const { onClose, onOpen, isOpen } = useDisclosure()
    const { cyzInfo, loading } = useCtzPrice(ctzToShow?.workHand, ctzToShow?.cake, ctzToShow?.coverage, ctzToShow?.filling, ctzToShow?.extra, ctzToShow?.people, ctzToShow?.earn)
    const [ctzToDelete, setCtzToDelete] = useState<CtzGlobalProp | null>(null)
    const [startElaborate, setStartElaborate] = useState<CtzGlobalProp | null>(null)
    const dateNow = new Date()
    const router = useRouter()

    useEffect(() => {
        if(ctzToShow){
            onOpen()
        }
    },[ctzToShow])

    const handleClose = () => {
        setCtzToDelete(null)
        setCtzToShow(null)
        onClose()
    }

    const handleDeleteCtz = () => {
        if(ctzToDelete){
            const index = ctzs.indexOf(ctzToDelete)
            const newArray = [...ctzs]
            newArray.splice(index, 1)
            createNewCtz(newArray, uid).then(() => {
                setCtzs(newArray)
                toast({ status: 'success', description: 'Cotización eliminada' })
                handleClose()
            })
        }
    }
    
    const handleElaborateCtz = () => {
        if(startElaborate){
            const ctzEdited = ctzs.map((eachCtz: CtzGlobalProp) => (
                {
                    id: eachCtz.id,
                    workHand: eachCtz?.workHand, 
                    cake: eachCtz?.cake, 
                    coverage: eachCtz?.coverage, 
                    filling: eachCtz?.filling, 
                    extra: eachCtz?.extra, 
                    people: eachCtz?.people, 
                    earn: eachCtz?.earn,
                    name: eachCtz?.name,
                    status: eachCtz.id === startElaborate?.id ? CTZ_STATUS_VALUE[1] : eachCtz?.status || CTZ_STATUS_VALUE[0],
                    created_at: eachCtz?.created_at || dateNow,
                    updated_at: dateNow
                }
            ))
            createNewCtz(ctzEdited, uid).then(() => {
                handleClose()
                router.push(`/cotizador/realizar-pedido/${ctzToShow?.id}`)
            })
        }
    }
    
    return (
        <>
        <CtzDelete
        setShowPopUp={setCtzToDelete}
        actionDelete={handleDeleteCtz}
        itemToDelete={ctzToDelete}
        />

        <ElaborateCtz
        setShowPopUp={setStartElaborate}
        actionElaborate={handleElaborateCtz}
        itemToElaborate={startElaborate}
        />
            <Modal 
            isCentered 
            size='5xl' 
            isOpen={isOpen} 
            onClose={handleClose} 
            scrollBehavior='inside'
            >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{ctzToShow?.name}</ModalHeader>
                <ModalBody>
                    {
                    loading 
                    ? (
                        <Loader />
                    )
                    : (
                        <TableContainer maxW={['85vw','100%']} overflowX='scroll'>
                            <Table variant='simple'>
                                <Tbody>
                                    <Tr>
                                        <Td><b>Numero de porciones: </b></Td>
                                        <Td>{ctzToShow?.people}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td><b>Torta: </b></Td>
                                        <Td>{cyzInfo?.ctzCakeName}</Td>
                                        <Td>{cyzInfo?.ctzCakePrice}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td><b>Relleno: </b></Td>
                                        <Td>{cyzInfo?.ctzFillingName}</Td>
                                        <Td>{cyzInfo?.ctzFillingPrice}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td><b>Cobertura: </b></Td>
                                        <Td>{cyzInfo?.ctzCoverageName}</Td>
                                        <Td>{cyzInfo?.ctzCoveragePrice}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td><b>Mano de obra: </b></Td>
                                        <Td></Td>
                                        <Td>{cyzInfo?.ctzWhPrice}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td><b>Gastos indirectos: </b></Td>
                                        <Td></Td>
                                        <Td>{cyzInfo?.ctzIndirectExpenses}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td><b>Ganancia: </b></Td>
                                        <Td></Td>
                                        <Td>{cyzInfo?.ctzEarn}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td><b>Extras: </b></Td>
                                        <Td>{
                                            ctzToShow?.extra && ctzToShow?.extra.map((extra:any) => (
                                                <Text key={extra.id}>{extra.name}</Text>
                                            ))
                                        }</Td>
                                        <Td>{cyzInfo?.ctzExtraPrice}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td><b>Total: </b></Td>
                                        <Td>
                                            {cyzInfo?.ctzTotalPrice}
                                        </Td>
                                        <Td>
                                            {cyzInfo?.ctzRoundedAmount} <b>(Redondeado)</b>
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    )
                    }
                    <ModalFooter gap={4}>
                        <Button onClick={handleClose}>Cerrar</Button>
                        <Link href={`cotizador/editar-cotizacion/${ctzToShow?.id}`}>
                            <Button onClick={handleClose} variant='outline'>
                                Editar
                            </Button>
                        </Link>
                        <Button onClick={() => setStartElaborate(ctzToShow)} variant='outline'>
                            Realizar pedido
                        </Button>
                        <Button variant='outline' onClick={() => setCtzToDelete(ctzToShow)}>Eliminar</Button>
                    </ModalFooter>
                </ModalBody>
            </ModalContent>
            </Modal>
        </>
    )
}

export default CtzDetails