import { Box, Button, Center, Flex, Grid, Heading, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Work from '@/assets/work-hand.svg'
import { useCtzActionsContext, useCtzStateContext } from '@/context/CotizacionContext'

const WorkHand = () => {
  const [hours, setHours] = useState<number>(0)
  const [hoursPrice, setHoursPrice] = useState<number>(0)
  const { ctzWorkHand, progress } = useCtzStateContext()
  const { setCtzWorkHand, setProgress } = useCtzActionsContext()

  useEffect(() => {
    if(ctzWorkHand){
      setHours((ctzWorkHand.hours))
      setHoursPrice(ctzWorkHand.hoursPrice)
    }
  },[])

  const saveWorkHand = () => {
    setCtzWorkHand({hours, hoursPrice})
    setProgress(progress + 1)
  }

  return (
      <Box 
      h='100%' 
      w={['100%','100%','80%' ,'80%']} 
      bg='#fcfcfc' 
      borderRadius={[8, 12]} 
      p={6}
      marginInline='auto'
      >
          <Grid 
          templateRows={['auto 1fr']}
          alignItems='center'
          gap={6}
          h='full'
          >
            <Flex alignItems='center' gap={6}>
              <Center pt={4}>
                <Box position='relative' w={['100px', '150px']}>
                    <Image
                    src={Work}
                    alt='Logo dbocados'
                />
                </Box>
              </Center>
              <Box>
                <Heading as='h3' mb={6} fontSize={['20px', '24px']}>
                  ¿Cuantos tiempo se llevará elaborar este pedido?
                </Heading>
                  <Text>
                      Indica también el precio que cuesta cada hora de trabajo
                  </Text>
              </Box>
            </Flex>
              <Flex direction='column' h='100%' justifyContent='space-between'>
                  <Box
                  w={['85%', '60%']}
                  marginInline='auto'
                  textAlign='center'
                  >
                      <Flex gap={4} mt={6} alignItems='center' w='60%' marginInline='auto'>
                          <Input
                          marginInline='auto'
                          size='lg'
                          textAlign='right'
                          type='number'
                          value={hours}
                          onChange={(e) => setHours(parseFloat(e.target.value))}
                          /> Horas
                      </Flex>
                      <Flex gap={4} mt={6} alignItems='center' w='60%' marginInline='auto'>
                          <Input
                          marginInline='auto'
                          size='lg'
                          textAlign='right'
                          type='number'
                          value={hoursPrice}
                          onChange={(e) => setHoursPrice(parseFloat(e.target.value))}
                          /> $/hora
                      </Flex>
                  </Box>
                  <Button 
                  w='full' 
                  bg='#e80297' 
                  color='white' 
                  mt={6}
                  isDisabled={hours <= 0 || hoursPrice <= 0}
                  onClick={saveWorkHand}
                  >
                      Guardar cambios
                  </Button>
              </Flex>
          </Grid>
      </Box>
  )
}

export default WorkHand
