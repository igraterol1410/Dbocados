import React, { Dispatch, SetStateAction, useState } from 'react'
import { Box, Button, Center, Flex, Grid, Heading, Text } from '@chakra-ui/react'
import PageContainer from '@/components/layout/PageContainer'
import Image from 'next/image'
import Ilustracion from '@/assets/configuracion.svg'
import SetupCotizador from '@/components/layout/cotizador/configuracion/ConfigurationList'

const Configuracion = () => {
    const [showList, setShowList] = useState<boolean>(false)
  return (
    <PageContainer title={showList ? 'Agrega ingredientes' : 'Configuración'}>
        {
            showList
            ? (
                <SetupCotizador />
            )
            : (
                <Introduccion showList={showList} setShowList={setShowList} />
            )
        }
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
            templateRows={['150px 1fr']}
            gap={6}
            h='full'
            >
                <Center>
                    <Image
                    src={Ilustracion}
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
                            ¡Estás a un paso de comenzar a generar cotizaciones!
                        </Heading>
                        <Text>
                            Antes de continuar, vamos a personalizar tu cotizador. Esto implica ingresar algunos precios referenciales. Esta configuración te permitirá crear cotizaciones precisas en el futuro. Empecemos.
                        </Text>
                    </Box>
                    <Button 
                    w='full' 
                    bg='#e80297' 
                    color='white' 
                    mt={6}
                    onClick={handleInformation}
                    >
                        ¡Entendido!
                    </Button>
                </Flex>
            </Grid>
        </Box>
    )
}

export default Configuracion
