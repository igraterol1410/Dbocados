import React, { Dispatch, SetStateAction, useState } from 'react'
import { Box, Button, Center, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import PageContainer from '@/components/layout/PageContainer'
import Image from 'next/image'
import Ilustracion from '@/assets/cotizaciones.svg'
import Link from 'next/link'
import { BiPlus } from 'react-icons/bi'

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
                            ¡Estás a un paso de comenzar a generar cotizaciones!
                        </Heading>
                        <Text>
                            Antes de continuar, vamos a personalizar tu cotizador. Esto implica ingresar algunos precios referenciales. Esta configuración te permitirá crear cotizaciones precisas en el futuro. Empecemos.
                        </Text>
                    </Box>                   
                </Box>
                <Flex direction='column' h='100%' justifyContent='space-between'>
                    <Link href='crear-cotizacion'>
                      <Button 
                      w='full' 
                      bg='#e80297' 
                      color='white' 
                      mt={6}
                      onClick={handleInformation}
                      rightIcon={<BiPlus />}
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