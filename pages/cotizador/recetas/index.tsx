import React from 'react'
import { Box, Button, Center, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import PageContainer from '@/components/layout/PageContainer'
import Image from 'next/image'
import Ilustracion from '@/assets/configuracion.svg'
import Link from 'next/link'
import { FaPlus, FaReceipt } from 'react-icons/fa'
import useGetRecipes from '@/hooks/useGetRecipes'
import Loader from '@/components/layout/Loader'
import RecipeCard from '@/components/layout/cotizador/recetas/RecipeCard'
import { Recipe } from '@/types/recipe'

const Recetas = () => {
    const { recipes, loading } = useGetRecipes()
  return (
    <PageContainer title={'Recetas'} titleIcon={<FaReceipt />}>
        {
            recipes.length === 0 && !loading
            ? (
                <Introduccion />
            )
            : (
                <GridItem
                borderRadius={[5, 10]}
                px={[3, 5]}
                py={[2, 4]}
                bg='#fcfcfc'
                display='grid'
                h='100%'
                gridTemplateRows={['auto 1fr auto']}
                >
                    <Text fontWeight='bold' textAlign='center'>
                        Tus Recetas
                    </Text>
                    <Grid templateColumns={['1fr', '1fr']} gap={4} mt={4}>
                        {
                        loading
                        ? (
                            <Box position='relative'>
                            <Loader />
                            </Box>
                        )
                        : (
                            <>
                            {
                                recipes && recipes.length > 0
                                ? (
                                <Grid alignSelf='self-start' templateColumns={['1fr', '1fr 1fr 1fr']} gap={4} mt={4}>                  
                                    {
                                    recipes && recipes.map((eachRecipe:Recipe, index:number) => (
                                        <RecipeCard key={index} recipe={eachRecipe} />
                                    ))
                                    }
                                </Grid>
                                )
                                : (
                                <Box>
                                    <Center>
                                    <Image
                                    src={Ilustracion}
                                    alt='Empty state'
                                    width={100}
                                    />
                                    </Center>
                                    <Center>
                                    <Text>Aún no tienes recetas, crea la primera aquí</Text>
                                    </Center>
                                </Box>
                                ) 
                            }
                            </>
                        )
                        }
                    </Grid>
                    <Center>
                        <Link href='/cotizador/crear-receta'>
                            <Button 
                            bg='pinkPrimary'
                            color='white'
                            _hover={{
                                bg:'pink.400'
                            }}
                            mt={4}
                            leftIcon={<FaPlus />}
                            >
                            Crear Receta
                            </Button>
                        </Link>
                    </Center>
                </GridItem>
            )
        }
    </PageContainer>
  )
}

const Introduccion = () => {

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
                <Flex direction='column' h='100%' justifyContent='center' marginInline='auto'>
                    <Link href='crear-receta'>
                      <Button 
                      bg='pinkPrimary' 
                      _hover={{bg: 'pink.400'}}
                      color='white' 
                      mt={6}
                      leftIcon={<FaPlus />}
                      >
                          Crear una receta
                      </Button>
                    </Link>
                </Flex>
            </Grid>
        </Box>
    )
}

export default Recetas
