import React from 'react'
import { Badge, Box, Button, Center, Flex, GridItem, Text } from '@chakra-ui/react'
import { CtzGlobalProp } from '@/types/ctz'
import { useCotizadorActionsContext } from '@/context/CotizadorGlobalContext'
import { CTZ_STATUSES, CTZ_STATUS_VALUE } from '@/constant/ctzStatus'
import Link from 'next/link'

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
            <Text noOfLines={1} fontWeight='bold' textAlign='center' mb={3}>
                Nombre: {ctz.name}
            </Text>
            <Flex 
            alignItems='center' 
            direction='column'
            gap={2}
            >
              <Text 
              alignSelf='flex-start' 
              fontWeight='bold' 
              fontSize='xs'
              > 
                <Badge 
                size='xs' 
                mr={1} 
                variant='outline'
                rounded={20}
                >
                  {ctz.people} porciones
                </Badge>
              </Text>
                <Badge 
                alignSelf='flex-start'
                display='flex' 
                alignItems='center' 
                gap={1} 
                fontSize='xs'  
                mr={1} 
                variant='subtle' 
                colorScheme={CTZ_STATUSES[CTZ_STATUS_VALUE.indexOf(ctz.status)]?.bg || CTZ_STATUSES[0].bg}
                rounded={20}
                >
                  <Box w='7px' h='7px' borderRadius='50%' bg={`${CTZ_STATUSES[CTZ_STATUS_VALUE.indexOf(ctz.status)]?.bg || CTZ_STATUSES[0].bg}.700`} />
                  {CTZ_STATUSES[CTZ_STATUS_VALUE.indexOf(ctz.status)]?.label || CTZ_STATUSES[0].label}
                </Badge>
            </Flex>
        </Box>
        <Center>
          {
            CTZ_STATUSES[CTZ_STATUS_VALUE.indexOf(ctz.status)]?.value === CTZ_STATUS_VALUE[1]
            ? (
              <Link href={`/cotizador/realizar-pedido/${ctz?.id}`}>
                <Button size='sm'>Ver preparación</Button>
              </Link>
            )
            : (
                <Button size='sm' onClick={() => setCtzToShow(ctz)}>Ver detalles</Button>
            )
          }
        </Center>
    </GridItem>
  )
}

export default CtzCard