import React from 'react'
import { Badge, Box, Button, Center, GridItem, Text } from '@chakra-ui/react'
import { CtzGlobalProp } from '@/types/ctz'
import { useCotizadorActionsContext } from '@/context/CotizadorGlobalContext'

const CtzCard= ({ctz}:{ctz: CtzGlobalProp}) => {
  const { setCtzToShow } = useCotizadorActionsContext()
  return (
    <GridItem 
    borderRadius={20} 
    shadow='xl'
    border='1px solid rgba(0, 0, 0, .3)'
    // bg='rgb(240, 240, 240)'
    px={4}
    py={2}
    display='flex'
    flexDirection='column'
    justifyContent='space-between'
    >
        <Box pb={3}>
            <Text fontWeight='bold' textAlign='center'>
                Cotización: {ctz.ctzName}
            </Text>
            <Badge variant='subtle' colorScheme='green'>{ctz.ctzPeople}</Badge>
        </Box>
        <Center>
            <Button variant='pinkButton' onClick={() => setCtzToShow(ctz)}>Ver detalles</Button>
        </Center>
    </GridItem>
  )
}

export default CtzCard