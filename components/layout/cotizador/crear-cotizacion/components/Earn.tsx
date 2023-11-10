import { Box, Button, Center, Flex, Grid, Heading, Input, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import EarnIcon from '@/assets/earn.svg'
import { useCtzActionsContext, useCtzStateContext } from '@/context/CotizacionContext'

const Earn = () => {
  const [moneyEarn, setMoneyEarn] = useState<number>(0)
  const { ctzEarn, progress } = useCtzStateContext()
  const { setCtzEarn, setProgress } = useCtzActionsContext()

  useEffect(() => {
    if(ctzEarn){
      setMoneyEarn(ctzEarn)
    }
  },[])

  const saveEarn = () => {
    setCtzEarn(moneyEarn)
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
          gap={6}
          h='full'
          >
            <Flex alignItems='center' gap={6} direction={['column', 'row']}>
                <Center>
                    <Box position='relative' w={['100px', '150px']}>
                        <Image
                        src={EarnIcon}
                        alt='Logo dbocados'
                        />
                    </Box>
                </Center>
                <Box>
                    <Heading as='h3' mb={6} fontSize={['20px', '24px']} textAlign={['center', 'left']}>
                        ¿Cuantos te gustaría ganar en este pedido?
                    </Heading>
                    <Text textAlign={['center', 'left']}>
                        Este paso es muy <b>importante</b>
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
                          value={moneyEarn}
                          onChange={(e) => setMoneyEarn(parseFloat(e.target.value))}
                          /> %
                      </Flex>
                  </Box>
                  <Button 
                  w='full' 
                  bg='#e80297' 
                  color='white' 
                  mt={6}
                  isDisabled={moneyEarn <= 0 }
                  onClick={saveEarn}
                  >
                      Guardar cambios
                  </Button>
              </Flex>
          </Grid>
      </Box>
  )
}

export default Earn
