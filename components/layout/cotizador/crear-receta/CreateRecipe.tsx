import PageContainer from '@/components/layout/PageContainer'
import CreateReceta from '@/components/layout/cotizador/crear-receta/RecetaForm'
import { useRecipeActionsContext, useRecipeStateContext } from '@/context/RecipeContext'
import { Box, Button, FormControl, Flex, Select, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps, Stack, Text, Input, Grid, Center, Heading, CircularProgress, CircularProgressLabel, FormLabel } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import Ilustracion from '@/assets/exito.svg'
import Link from 'next/link'
import Image from 'next/image'
import { RECIPE_TYPES } from '@/constant/recipeTypes'

const CreateRecipe = () => {
    const { pageTitle, progress } = useRecipeStateContext()
    const { setProgress } = useRecipeActionsContext()

    const recipeProgress = [
      {
        component:<ChooseType />
      },
      {
        component:<ChooseName />
      },
      {
        component:<ChoosePeople />
      },
      {
        component:<CreateReceta />
      },
      {
        component:<RecipeSuccess />
      }      
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
        title: 'Felicidades', 
        description: 'Receta creada con exito' 
      }
    ]
  
    const { activeStep } = useSteps({
      index: 0,
      count: recipeProgress.length,
    })
  
    const activeStepText = steps[progress].description
  return (
    <PageContainer title={pageTitle} titleIcon={<></>}>     
      <Grid
      templateRows='auto 1fr'
      alignItems='center'
      >
        <Flex 
        marginInline='auto' 
        w={['100%','100%','90%' ,'90%']} 
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
            _hover={{color: 'pinkPrimary'}}
            onClick={() => setProgress(progress - 1)} 
            >
              <MdArrowBackIosNew /> Volver
            </Flex>
          }
          <Box>
            <CircularProgress size='80px' value={((progress + 1)/recipeProgress.length)*100} color='pinkPrimary'>
              <CircularProgressLabel fontWeight='bold' color='pinkPrimary'>{progress + 1}/{recipeProgress.length}</CircularProgressLabel>
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
      </Grid>     
    </PageContainer>
  )
}

const ChooseType = () => {
    const { progress, recipeType } = useRecipeStateContext()
    const { setPageTitle, setProgress, setRecipeType } = useRecipeActionsContext()
  
    const handleChooseType = () => {
      setPageTitle(`Crear receta de ${recipeType}`)
      setProgress(progress + 1)
    }

    const handleRecipeType = (value:string) => {
      setRecipeType(value)
    }
  
    return (
      <Box 
      w={['100%','100%','90%' ,'90%']} 
      h='90%'
      bg='white' 
      px={[3, 5]} 
      py={[2, 4]} 
      borderRadius={8}
      marginInline='auto'
      display='grid'
      gridTemplateRows='1fr auto'
      >
        <FormControl>
          <FormLabel>
            <Box textAlign='center'>Indíca el tipo de receta</Box>
          </FormLabel>
          <Select placeholder='Elige uno' onChange={(e) => handleRecipeType(e.target.value)}>
            {
              RECIPE_TYPES.map((type, index) => (
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
        bg='pinkPrimary' 
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
      w={['100%','100%','90%' ,'90%']} 
      h='100%'
      bg='white' 
      px={[3, 5]} 
      py={[2, 4]} 
      borderRadius={8}
      marginInline='auto'
      display='grid'
      gridTemplateRows='1fr auto'
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
        bg='pinkPrimary' 
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
      w={['100%','100%','90%' ,'90%']} 
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
                    <option key={index} value={type}>{type}</option>
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
        bg='pinkPrimary' 
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
        templateRows={['auto 1fr']}
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
                  bg='pinkPrimary' 
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
