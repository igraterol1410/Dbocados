import Seo from '@/components/seo/Seo'
import { Box, Button, Center, FormControl, FormHelperText, FormLabel, Grid, GridItem, Heading, Input, Text, useToast } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import CursoPost from '@/assets/cubierta-chocolate.jpg'
import DbocadosLogo from '@/assets/logo.svg'
import Image from 'next/image'
import { createNewStudent } from '@/services/students'
import { AiOutlineWhatsApp } from "react-icons/ai";

const CubiertaChocolate = () => {
    const toast = useToast()
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const handleSubmit = (values: {}) => {
        setLoading(true)
        createNewStudent(values).then(() => {
            setSuccess(true)
            toast({
                title: 'Genial',
                description: "Te has inscrito de forma exitosa, ahora únete al grupo de whatsapp donde se enviará toda la información",
                position:'top-right',
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
              setLoading(false)
        })
    }
  return (
    <Seo
    title='Cubierta de chocolate'
    description='Curso virtual de cubierta de chocolate especial'
    >
        <Grid w='full' templateColumns={['1fr', '1fr 1fr']} alignContent='center'>
            <GridItem 
            justifySelf='center'
            display='flex'
            alignItems='center'             
            h={['100%','100vh']}
            >
                {/* <Heading textAlign='center' mb={4} color='#683c10'>Curso de cubierta especial de Chocolate</Heading> */}
                <Image
                src={CursoPost}
                alt='Post de curso virtual de cubierta especial de chocolate'
                />
            </GridItem>
            <GridItem 
            alignSelf='center'
            p={8}  
            w='100%' 
            h={['100vh']}
            marginInline='auto'
            bg='#683c10'
            color='white'
            display='grid'
            alignItems='center'
            >
                <Box>
                    <Center>
                    <Box 
                    h='100px' 
                    w='100px' 
                    borderRadius='50%' 
                    bg='white'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    mb={6}
                    >
                        <Image 
                        src={DbocadosLogo} 
                        height={40}
                        alt='logo'
                        />
                    </Box>
                    </Center>
                    {
                        success
                        ? (
                            <>
                                <Center>
                                    <Text fontSize='xl' fontWeight='bold'>Bienvenido</Text>
                                </Center>
                                <Center mt={4}>
                                    <a href="https://chat.whatsapp.com/EFGAEvrhJkFFSq6j0L8iC2">
                                        <Button 
                                        bg='#25D366' 
                                        color='white' 
                                        rightIcon={<AiOutlineWhatsApp style={{color:'white', fontSize:'1.25rem'}} />}
                                        borderRadius='full'
                                        size='lg'
                                        >
                                            Ir al grupo de WhatsApp
                                        </Button>
                                    </a>
                                </Center>
                            </>
                        )
                        : (
                            <>
                                <Heading color='white' textAlign='center' mb={6}>
                                    Formulario de inscripción
                                </Heading>
                                <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    phone: ''
                                }}
                                validate={(values) => {}}
                                onSubmit={handleSubmit}
                                >
                                    {({values, errors, touched}) => 
                                    (
                                        <Form>
                                            <FormControl w='full'>
                                                <FormLabel>Nombre completo</FormLabel>
                                                <Field
                                                as={Input}
                                                name='name'
                                                type='text'
                                                placeholder='Nombre'
                                                />
                                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                            </FormControl>
                                            <FormControl w='full' mt={5}>
                                                <FormLabel>Correo</FormLabel>
                                                <Field
                                                as={Input}
                                                name='email'
                                                type='email'
                                                placeholder='Correo'
                                                />
                                                {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                                            </FormControl>
                                            <FormControl w='full' mt={5}>
                                                <FormLabel>Número de teléfono</FormLabel>
                                                <Field
                                                as={Input}
                                                name='phone'
                                                type='number'
                                                placeholder='Teléfono'
                                                />
                                                {
                                                    touched.phone && errors.phone &&
                                                    <FormHelperText color='white'>
                                                        {errors.phone}
                                                    </FormHelperText>
                                                }
                                            </FormControl>
                                            <Button 
                                            mt={5} 
                                            w='full'
                                            bg='#e80297' 
                                            color='white'
                                            isDisabled={!values.email || !values.name || !values.phone}
                                            type='submit'
                                            isLoading={loading}
                                            loadingText='Guardando tus datos'
                                            >
                                                Confirmar inscripción
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </>
                        )
                    }
                </Box>
            </GridItem>
        </Grid>
    </Seo>
  )
}

export default CubiertaChocolate
