import React, { Dispatch, SetStateAction, useState } from 'react'
import { Box, Button, Center, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import PageContainer from '@/components/layout/PageContainer'
import Image from 'next/image'
import Ilustracion from '@/assets/cotizaciones.svg'
import Link from 'next/link'
import { FaPlus } from 'react-icons/fa'

const Cotizaciones = () => {
    const [showList, setShowList] = useState<boolean>(false)
  return (
    <PageContainer title={'Cotizaciones'}>
        <Introduccion showList={showList} setShowList={setShowList} />
    </PageContainer>
  )
}

interface introduccionProps {
    showList:boolean,
    setShowList: Dispatch<SetStateAction<boolean>>
}

const Introduccion:React.FC<introduccionProps> = ({showList, setShowList}) => {

    const handleInformation = () => {
        setShowList(true)
    }

    return (
        <Box w='full' h='full' bg='#fcfcfc' borderRadius={[8, 12]} p={6} marginY='auto'>
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
                        height={200}
                        />
                    </Center>
                    <Box
                    w={['85%', '80%']}
                    marginInline='auto'
                    textAlign='center'
                    >
                        <Heading as='h3' mb={6}>
                            ¡Estás a un paso de comenzar a generar cotizaciones!
                        </Heading>
                        <Text>
                            Antes de continuar, vamos a personalizar tu cotizador. Esto implica ingresar algunos precios referenciales. Esta configuración te permitirá crear cotizaciones precisas en el futuro. Empecemos.
                        </Text>
                    </Box>                   
                </Box>
                <Flex direction='column' h='100%' justifyContent='center' marginInline='auto'>
                    <Link href='crear-cotizacion'>
                      <Button 
                      bg='pink.500' 
                      _hover={{bg: 'pink.400'}}
                      color='white' 
                      mt={6}
                      onClick={handleInformation}
                      leftIcon={<FaPlus />}
                      >
                          Crear una cotización
                      </Button>
                    </Link>
                </Flex>
            </Grid>
        </Box>
    )
}

export default Cotizaciones