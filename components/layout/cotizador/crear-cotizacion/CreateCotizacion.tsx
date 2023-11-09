/* eslint-disable react/jsx-key */
import React from 'react'
import Cake from './components/Cake'
import People from './components/People'
import Filling from './components/Filling'
import Coverage from './components/Coverage'
import Extras from './components/Extras'
import Earn from './components/Earn'
import Finish from './components/Finish'
import Save from './components/Save'
import SendToClient from './components/SendToClient'
import WorkHand from './components/WorkHand'
import Approve from './components/Approve'
import Created from './components/Created'
import { Box, CircularProgress, CircularProgressLabel, Flex, Stack, Step, StepIcon, StepIndicator, StepSeparator, StepStatus, Stepper, Text, useSteps } from '@chakra-ui/react'
import PageContainer from '../../PageContainer'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useCtzActionsContext, useCtzStateContext } from '@/context/CotizacionContext'

const CreateCotizacion = () => {
    const { pageTitle, progress } = useCtzStateContext()
    const { setProgress } = useCtzActionsContext()

    const recipeProgress = [
      {
        component:<People />
      },
      {
        component:<Cake />
      },
      {
        component:<Filling />
      },
      {
        component:<Coverage />
      },
      {
        component:<Extras />
      },
      {
        component:<WorkHand />
      },
      {
        component:<Earn />
      },
      {
        component:<Finish />
      },
      {
        component:<Created />
      },
      {
        component:<Save />
      },
      {
        component:<SendToClient />
      },
      {
        component:<Approve />
      }
    ]
  
    const steps = [
        { 
          title: 'Número de personas', 
          description: 'Indica para cuantas personas será la torta' 
        },
        { 
            title: 'Bizcocho/Torta', 
            description: 'Selecciona el tipo de bizcocho o torta' 
        },
        { 
            title: 'Relleno', 
            description: 'Elige un relleno (opcional)' 
        },
        { 
            title: 'Cobertura', 
            description: 'Elige una cobertura (opcional)' 
        },
        { 
            title: 'Extras', 
            description: 'Agrega los extras de este pedido' 
        },
        { 
            title: 'Mano de obra', 
            description: 'Indica el tiempo que tomará realizar este pedido' 
        },
        { 
            title: 'Ganancia', 
            description: 'Indica la ganancia estimada por este pedido' 
        },
        { 
            title: 'Cotización creada', 
            description: 'Resumen de tu cotización' 
        },
        { 
            title: '¿Deseas guardar esta cotización?', 
            description: 'Puedes guardar esta cotización para que la proxima vez sea mucho mas rápido' 
        },
        { 
            title: '¿Deseas enviar esta cotización a tu cliente?', 
            description: 'Contización aprobada' 
        }
    ]

  return (
    <PageContainer title={pageTitle}>
      <Flex 
      marginInline='auto' 
      w={['100%','100%','80%' ,'80%']} 
      alignItems='center' 
      position='relative'
      gap={4}
      >
        {
          (progress + 1) > 1 && (progress + 1) < recipeProgress.length &&
          <Flex 
          cursor='pointer' 
          position='absolute' 
          top='-32px' 
          alignItems='center' 
          w='auto' 
          gap={2}
          _hover={{color: '#e80297'}}
          onClick={() => setProgress(progress - 1)} 
          >
            <MdArrowBackIosNew /> Volver
          </Flex>
        }
        <Box>
          <CircularProgress size='80px' value={(progress/recipeProgress.length)*100} color='pink.500'>
            <CircularProgressLabel fontWeight='bold' color='pink.500'>{progress + 1}/{recipeProgress.length}</CircularProgressLabel>
          </CircularProgress>
        </Box>
        <Box >
          <Text fontWeight='bold'>{steps[progress].title}</Text>
          <Text maxW='250px' overflowWrap='break-word'>{steps[progress].description}</Text>
        </Box>
      </Flex>
        {
          recipeProgress[progress].component
        }
    </PageContainer>
  )
}

export default CreateCotizacion
