import { Box, Button, Flex, Grid, Heading, Table, TableContainer, Tbody, Td, Text, Tr } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { useCtzActionsContext, useCtzStateContext } from '@/context/CotizacionContext'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const Created = () => {
    const { progress, ctzExtra, ctzPeople, ctzInfo } = useCtzStateContext()
    const { setProgress } = useCtzActionsContext()
    const pdfRef:any = useRef()

    const handleNext = () => {
    setProgress(progress + 1)
    }
    const downloadPdfCtz = () => {
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


  return (
    <Box h='100%' w='full' bg='#fcfcfc' borderRadius={[8, 12]} p={6}>
          <Grid
          templateRows={['1fr auto']}
          alignItems='center'
          gap={6}
          h='full'
        //   overflowY='scroll'
          >
              <Flex direction='column' h='100%' justifyContent='space-between'>
                  <Box 
                  ref={pdfRef}
                  w={['85%', '60%']}
                  marginInline='auto'
                  textAlign='center'
                  >
                      <Heading as='h3' mb={6}>
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
                  <Button 
                  w='full' 
                  bg='#e80297' 
                  color='white' 
                  mt={6}
                  onClick={downloadPdfCtz}
                  >
                      Descargar
                  </Button>
              </Flex>
          </Grid>
      </Box>
  )
}

export default Created
