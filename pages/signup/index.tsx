import Layout from '@/components/layout/Layout'
import Seo from '@/components/seo/Seo'
import { Box, Button, Center, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const Signup = () => {
  return (
    <Seo
    title='Registrate'
    description='Resgistrate en nuestra web y obtén mejor atemción y más beneficios'
    >
        <Layout>
            <Box>
                <Center>
                    <Text>Registro</Text>
                </Center>
                {/* <Formik
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
                </Formik> */}
                <Link href="/">
            <Button>Ir al home</Button>
        </Link>
            </Box>
        </Layout>
    </Seo>
  )
}

export default Signup
