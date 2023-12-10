import { Box, Button, ButtonGroup, Flex, Grid, Heading, Table, TableContainer, Tbody, Td, Text, Tr, useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { useCtzStateContext } from '@/context/CotizacionContext'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { BsCloudDownload } from 'react-icons/bs'
import { FiSave } from 'react-icons/fi'
import ConfirmCreateCtz from '@/components/modals/ConfirmCreateCtz'
import { useCotizadorStateContext } from '@/context/CotizadorGlobalContext'
import useGetCtz from '@/hooks/useGetCtz'
import { CtzGlobalProp } from '@/types/ctz'
import { createNewCtz } from '@/services/cotizaciones'
import {v4 as uuidv4} from 'uuid'
import { useRouter } from 'next/router'
import { CTZ_STATUS_VALUE } from '@/constant/ctzStatus'

const Created = () => {    
    const toast = useToast()
    const router = useRouter()
    const { ctzExtra, ctzPeople, ctzInfo, editId,ctzWorkHand, ctzCake, ctzCoverage, ctzFilling, ctzEarn, ctzName } = useCtzStateContext()
    const { ctzUser, uid } = useCotizadorStateContext()
    const { ctz } = useGetCtz()
    const pdfRef:any = useRef()    
    const [showPopUp, setShowPopUp] = useState<boolean>(false)
    const dateNow = new Date()

    const downloadPdfCtz:any = () => {
        const input = pdfRef.current
        html2canvas(input).then((canvas) =>{
            const imageData = canvas.toDataURL('image/png')
            const pdf = new jsPDF('p','mm', 'a4', true)
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = pdf.internal.pageSize.getHeight()
            const imgWidth = canvas.width
            const imgHeight = canvas.height
            const ratio = Math.min(pdfWidth / imgWidth , pdfHeight / imgHeight)
            const imgX = (pdfWidth - imgWidth * ratio) / 2
            const imgY = 30
            pdf.addImage(imageData, 'PNG', imgX, imgY, imgWidth*ratio, imgHeight*ratio)
            pdf.save('cotizacion.pdf')
        })
    }

    const handleSaveCtz = () => {
        setShowPopUp(true)
    }

    const createCtz = () => {
        if(ctzUser){
            if(editId){
                const ctzEdited = ctz.map((eachCtz: CtzGlobalProp) => (
                    {
                        id: eachCtz.id,
                        workHand: eachCtz.id === editId ? ctzWorkHand : eachCtz?.workHand, 
                        cake: eachCtz.id === editId ? ctzCake : eachCtz?.cake, 
                        coverage: eachCtz.id === editId ? ctzCoverage : eachCtz?.coverage, 
                        filling: eachCtz.id === editId ? ctzFilling : eachCtz?.filling, 
                        extra: eachCtz.id === editId ? ctzExtra : eachCtz?.extra, 
                        people: eachCtz.id === editId ? ctzPeople : eachCtz?.people, 
                        earn: eachCtz.id === editId ? ctzEarn : eachCtz?.earn,
                        name: eachCtz.id === editId ? ctzName : eachCtz?.name,
                        status: eachCtz?.status || CTZ_STATUS_VALUE[0],
                        created_at: eachCtz?.created_at,
                        updated_at: dateNow
                    }
                ))
                createNewCtz(ctzEdited, uid).then(() => {
                    toast({ status: 'success', description: 'Cotización Editada' })
                    setShowPopUp(false)
                    router.push('/cotizador')
                })
            } else {
                const newCtz = {
                    id: uuidv4(),
                    workHand: ctzWorkHand, 
                    cake: ctzCake, 
                    coverage: ctzCoverage, 
                    filling: ctzFilling, 
                    extra: ctzExtra, 
                    people: ctzPeople, 
                    earn: ctzEarn,
                    name: ctzName,
                    status: CTZ_STATUS_VALUE[0],
                    created_at: dateNow,
                    updated_at: dateNow
                }
                const payload = [...ctz, newCtz]
                console.log(newCtz)
                createNewCtz(payload, uid).then(() => {
                    toast({ status: 'success', description: 'Cotización guardada' })
                    setShowPopUp(false)
                    router.push('/cotizador')
                })
            }
        } else {
            toast({ status: 'error', description: 'No puedes realizar esta acción' })
            setTimeout(() => {
                window.location.reload()                
            }, 2000);
        }
    }


  return (
    <Box h='100%' w='full' bg='#fcfcfc' borderRadius={[8, 12]} p={6}>
        <ConfirmCreateCtz showPopUp={showPopUp} setShowPopUp={setShowPopUp} createCtz={createCtz} />
          <Grid
          templateRows={['1fr auto']}
          alignItems='center'
          gap={6}
          h='full'
          >
              <Flex direction='column' h='100%' justifyContent='space-between'>
                  <Box 
                  ref={pdfRef}
                  w={['100%', '60%']}
                  marginInline='auto'
                  textAlign='center'
                  >
                      <Heading as='h3' mb={6} fontSize={['16px', '22px']}>
                          Cotización de tu pedido
                      </Heading>
                      <TableContainer>
                        <Table variant='simple'>
                            <Tbody>
                                <Tr>
                                    <Td><b>Numero de personas: </b></Td>
                                    <Td textAlign='right'>{ctzPeople}</Td>
                                </Tr>
                                <Tr>
                                    <Td><b>Torta: </b></Td>
                                    <Td textAlign='right'>{ctzInfo.ctzCakeName}</Td>
                                </Tr>
                                <Tr>
                                    <Td><b>Relleno: </b></Td>
                                    <Td textAlign='right'>{ctzInfo.ctzFillingName}</Td>
                                </Tr>
                                <Tr>
                                    <Td><b>Cobertura: </b></Td>
                                    <Td textAlign='right'>{ctzInfo.ctzCoverageName}</Td>
                                </Tr>
                                <Tr>
                                    <Td><b>Extras: </b></Td>
                                    <Td textAlign='right'>{
                                        ctzExtra && ctzExtra.map((extra) => (
                                            <Text key={extra.id}>{extra.name}</Text>
                                        ))
                                    }</Td>
                                </Tr>
                                <Tr fontSize='1.5rem' fontWeight='bold'>
                                    <Td><b>Total: </b></Td>
                                    <Td textAlign='right'>
                                        {ctzInfo?.ctzRoundedAmount}
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                  </Box>
                  <ButtonGroup justifyContent='center' gap='4' mt={6}>
                    <Button 
                    variant='outline'
                    w='30%'
                    color='pinkPrimary' 
                    bg='white' 
                    borderColor='pinkPrimary'
                    onClick={downloadPdfCtz}
                    leftIcon={<BsCloudDownload />}
                    >
                        Descargar
                    </Button> 
                    <Button 
                    onClick={handleSaveCtz}
                    leftIcon={<FiSave />}
                    w='30%'
                    >
                        {editId ? 'Editar nombre' : 'Guardar y finalizar'}
                    </Button>
                  </ButtonGroup>
              </Flex>
          </Grid>
      </Box>
  )
}

export default Created
