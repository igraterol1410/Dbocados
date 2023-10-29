import PageContainer from '@/components/layout/PageContainer'
import CreateReceta from '@/components/layout/cotizador/crear-receta/RecetaForm'
import { useRecipeActionsContext, useRecipeStateContext } from '@/context/RecipeContext'
import { Box, Button, FormControl, FormLabel, Select, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps, Stack, Text, Input } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

const CreateRecipe = () => {
    const { pageTitle, progress, recipeName, recipePeople, recipeType } = useRecipeStateContext()

    const recipeProgress = [
      <ChooseType />,
      <ChooseName />,
      <ChoosePeople />,
      <CreateReceta />
    ]
  
    const steps = [
      { title: 'Selecciona el tipo de receta', description: 'Agrega ingredientes' },
      { title: 'Agrega ingredientes', description: 'Escoge ingredientes dentro de tu lista' }
    ]
  
    const { activeStep } = useSteps({
      index: 0,
      count: recipeProgress.length,
    })
  
    const activeStepText = steps[activeStep].description
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
            Step {activeStep + 1}: <b>{activeStepText}</b> {pageTitle} {progress} {recipeName} {recipePeople}, {recipeType}
          </Text>
        </Stack>
        {
          recipeProgress[progress]
        }
    </PageContainer>
  )
}

const ChooseType = () => {
    const { progress } = useRecipeStateContext()
    const { setPageTitle, setProgress } = useRecipeActionsContext()
    const recetaTypes = ['Torta', 'Relleno', 'Cobertura']
    const [recetaType, setRecetaType] = useState<string>('Crear receta')
  
    const handleChooseType = () => {
      setPageTitle(`Crear receta de ${recetaType}`)
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
          <FormLabel>Elige el tipo de receta</FormLabel>
        <FormControl>
          <Select placeholder='Elige uno' onChange={(e) => setRecetaType(e.target.value)}>
            {
              recetaTypes.map((type, index) => (
                <option value={type} key={index}>{type}</option>
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
        isDisabled={!recetaType}
        >
          Siguente
        </Button>
      </Box>
    )
  }
  
  const ChooseName = () => {
    const { recipeName, progress, pageTitle } = useRecipeStateContext()
    const { setPageTitle, setProgress } = useRecipeActionsContext()
    const [receta, setReceta] = useState<string>('')
  
    const handleChooseType = () => {
      setPageTitle(`${pageTitle} - ${receta}`)
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
          <FormLabel>Colocale un nombre a tu receta</FormLabel>
        <FormControl>
          <Input 
          placeholder='Nombre de tu receta' 
          onChange={(e) => setReceta(e.target.value)} 
          />
        </FormControl>
        <Button 
        w='full' 
        marginInline='auto' 
        mt={6}
        onClick={()=> handleChooseType()}
        bg='#e80297' 
        color='white' 
        isDisabled={!receta}
        >
          Siguente
        </Button>
      </Box>
    )
  }
  
  const ChoosePeople = () => {
    const { setProgress } = useRecipeActionsContext()
    const { progress } = useRecipeStateContext()
    const recetaTypes = ['8 - 12', '13 - 20', '21 - 30', 'Otro']
    const [peopel, setPeopel] = useState<string>('')
  
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
          <FormLabel>Elige el tipo de receta</FormLabel>
          <Box>
            <FormControl>
              <Select placeholder='Elige uno' onChange={(e) => setPeopel(e.target.value)}>
                {
                  recetaTypes.map((type, index) => (
                    <option value={type} key={index}>{type}</option>
                  ))
                }
              </Select>
            </FormControl>
            {
              peopel === 'Otro' &&
              <Box>elige otro</Box>
            }
          </Box>
        <Button 
        w='full' 
        marginInline='auto' 
        mt={6}
        onClick={()=> handleChooseType()}
        bg='#e80297' 
        color='white' 
        isDisabled={!peopel}
        >
          Siguente
        </Button>
      </Box>
    )
  }

export default CreateRecipe
