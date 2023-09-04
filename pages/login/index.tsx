import Layout from '@/components/layout/Layout'
import Seo from '@/components/seo/Seo'
import { Box, Button, Center, Input, Text } from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <Seo
    title='Inicio de sesión'
    description='Inicia sesión'
    >
        <Layout>
            <Box>
                <Center>
                    <Text>Inicia sesión</Text>
                </Center>
                <Formik
                initialValues={{}}
                validate={(values) => {
                    console.log(values)
                }}
                onSubmit={() => console.log('enviando')}
                >
                    {({values, errors, touched}) => 
                    (
                        <Form>
                            <Field
                            as={Input}
                            name='email'
                            type='email'
                            />
                        </Form>
                    )}
                </Formik>
                <Link href="/">
            <Button>Ir al home</Button>
        </Link>
            </Box>
        </Layout>
    </Seo>
  )
}

export default Login
