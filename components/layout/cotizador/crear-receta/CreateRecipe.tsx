import PageContainer from '@/components/layout/PageContainer'
import CreateReceta from '@/components/layout/cotizador/crear-receta/RecetaForm'
import { useRecipeActionsContext, useRecipeStateContext } from '@/context/RecipeContext'
import { Box, Button, FormControl, Flex, Select, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps, Stack, Text, Input, Grid, Center, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import Ilustracion from '@/assets/exito.svg'
import Link from 'next/link'
import Image from 'next/image'

const CreateRecipe = () => {
    const { pageTitle, progress } = useRecipeStateContext()
    const { setProgress } = useRecipeActionsContext()

    const recipeProgress = [
      <ChooseType />,
      <ChooseName />,
      <ChoosePeople />,
      <CreateReceta />,
      <RecipeSuccess />
    ]
  
    const steps = [
      { 
        title: 'Tipo de receta', 
        description: 'Selecciona el tipo de receta' 
      },
      { 
        title: 'Nombre', 
        description: 'Colócale nombre a tu nueva receta' 
      },
      { 
        title: 'Número de personas', 
        description: 'Indica para cuantas personas rinde esta receta' 
      },
      { 
        title: 'Agrega ingredientes', 
        description: 'Escoge ingredientes dentro de tu lista' 
      },
      { 
        title: 'Receta creada con exito', 
        description: 'Receta creada con exito' 
      }
    ]
  
    const { activeStep } = useSteps({
      index: 0,
      count: recipeProgress.length,
    })
  
    const activeStepText = steps[progress].description
  return (
    <PageContainer title={pageTitle}>          
        <Stack w={['100%','100%','70%' ,'70%']} marginInline='auto'>
          <Stepper size='sm' index={progress} gap='0'>
            {recipeProgress.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus complete={<StepIcon />} />
                </StepIndicator>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
          <Text>
            Paso {progress + 1}: <b>{activeStepText}</b>
          </Text>
        </Stack>
        <Box position='relative'>
          <Stack p={4} w={['100%','100%','80%' ,'80%']} marginInline='auto'>
            {
              (progress + 1) > 1 && (progress + 1) < 5 &&
              <Flex 
              cursor='pointer' 
              position='absolute' 
              top='-16px' 
              alignItems='center' 
              w='auto' 
              gap={2}
              _hover={{color: '#e80297'}}
              onClick={() => setProgress(progress - 1)} 
              >
                <MdArrowBackIosNew /> Volver
              </Flex>
            }
          </Stack>
          {
            recipeProgress[progress]
          }
        </Box>
    </PageContainer>
  )
}

const ChooseType = () => {
    const { progress, recipeType } = useRecipeStateContext()
    const { setPageTitle, setProgress, setRecipeType } = useRecipeActionsContext()
    const recetaTypes = ['Torta', 'Relleno', 'Cobertura']
  
    const handleChooseType = () => {
      setPageTitle(`Crear receta de ${recipeType}`)
      setProgress(progress + 1)
    }

    const handleRecipeType = (value:string) => {
      setRecipeType(value)
    }
  
    return (
      <Box 
      w={['100%','100%','80%' ,'80%']} 
      h='100%'
      bg='white' 
      px={[3, 5]} 
      py={[2, 4]} 
      borderRadius={8}
      marginInline='auto'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      >
        <FormControl>
          <Select placeholder='Elige uno' onChange={(e) => handleRecipeType(e.target.value)}>
            {
              recetaTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))
            }
          </Select>
        </FormControl>
        <Button 
        w='full' 
        marginInline='auto' 
        mt={6}
        onClick={()=> handleChooseType()}
        bg='#e80297' 
        color='white' 
        isDisabled={!recipeType}
        >
          Siguente
        </Button>
      </Box>
    )
  }
  
  const ChooseName = () => {
    const { recipeName, progress, pageTitle } = useRecipeStateContext()
    const { setPageTitle, setProgress, setRecipeName } = useRecipeActionsContext()
  
    const handleChooseType = () => {
      setPageTitle(`${pageTitle} - ${recipeName}`)
      setProgress(progress + 1)
    }

    const handleRecipeNAme = (value:string) => {
      setRecipeName(value)
    }

    return (
      <Box 
      w={['100%','100%','80%' ,'80%']} 
      h='100%'
      bg='white' 
      px={[3, 5]} 
      py={[2, 4]} 
      borderRadius={8}
      marginInline='auto'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      >
        <FormControl>
          <Input 
          placeholder='Nombre de tu receta' 
          onChange={(e) => handleRecipeNAme(e.target.value)} 
          />
        </FormControl>
        <Button 
        w='full' 
        marginInline='auto' 
        mt={6}
        onClick={()=> handleChooseType()}
        bg='#e80297' 
        color='white' 
        isDisabled={!recipeName}
        >
          Siguente
        </Button>
      </Box>
    )
  }
  
  const ChoosePeople = () => {
    const { setProgress, setRecipePeople } = useRecipeActionsContext()
    const { progress, recipePeople } = useRecipeStateContext()
    const recetaTypes = ['8', '12', '16', '20', '25', '30', 'Otro']
    const [showOthers, setShowOthers] = useState<boolean>(false)

    const handlePeopleNumber = (value: string) => {
      if(value === 'Otro'){
        setShowOthers(true)
      } else {
        setRecipePeople(value)      
        setShowOthers(false)
      }
    }
    
    const handlePeopleOtherNumber = (value: string) => {
      setRecipePeople(value)      
    }
  
    const handleChooseType = () => {
      setProgress(progress + 1)
    }
    return (
      <Box 
      w={['100%','100%','80%' ,'80%']} 
      h='100%'
      bg='white' 
      px={[3, 5]} 
      py={[2, 4]} 
      borderRadius={8}
      marginInline='auto'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      >
          <Box>
            <FormControl>
              <Select placeholder='Elige uno' onChange={(e) => handlePeopleNumber(e.target.value)}>
                {
                  recetaTypes.map((type, index) => (
                    <option value={type} key={index}>{type}</option>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
            {
              showOthers &&
              <FormControl>
                <Input 
                placeholder='Número de personas' 
                type='number'
                onChange={(e) => handlePeopleOtherNumber(e.target.value)} 
                />
              </FormControl>
            }
        <Button 
        w='full' 
        marginInline='auto' 
        mt={6}
        onClick={()=> handleChooseType()}
        bg='#e80297' 
        color='white' 
        isDisabled={!recipePeople}
        >
          Siguente
        </Button>
      </Box>
    )
  }

  const RecipeSuccess = () => {
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
                      ¡Receta Creada con Éxito!
                    </Heading>
                    <Text>
                      Felicidades, has completado con éxito el proceso de creación de tu receta. Ahora, estás listo para dar el siguiente paso en tu aventura culinaria. Empieza a crear cotizaciones, calcula costos y abre las puertas a nuevas oportunidades de negocios con tus deliciosos platos. ¡Estamos emocionados de ver a dónde te llevará esta nueva etapa!
                    </Text>
                </Box>
                <Link href='/cotizador'>
                  <Button 
                  w='full' 
                  bg='#e80297' 
                  color='white' 
                  mt={6}
                  >
                      Finalizar
                  </Button>
                </Link>
            </Flex>
        </Grid>
      </Box>
    )
  }

export default CreateRecipe
