import Layout from "./layout/Layout"
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Grid, Heading, Image, Link, Stack, Text } from '@chakra-ui/react'
import { useEffect, useState } from "react"
import { getCourses } from '@/services/courses'

const LandingPage = () => {
  const [courses, setCourses] = useState(null)
  useEffect(() => {
    getCourses().then((res) => setCourses(res))
  },[])

  return (
    <Layout>
        <Box bg='tomato'>this is the test</Box>
        <Text>It took much time to work, but it worked</Text>
        <Link href="/about-us">
            <Button>
                Go to about us page
            </Button>
        </Link>
        <Grid templateColumns={['1fr', 'repeat(3, 1fr)']}>
          {
            courses && courses.map((course, index) => (
              <Card shadow='xl' key={index} maxW='sm'>
                <CardBody>
                  <Image
                    src={course?.image}
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                  />
                  <Stack mt='6' spacing='3'>
                    <Heading size='md'>{course.name}</Heading>
                    <Text>
                      {course.description}
                    </Text>
                    {/* <Text color='blue.600' fontSize='2xl'>
                      $450
                    </Text> */}
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='blue'>
                      Buy now
                    </Button>
                    <Button variant='ghost' colorScheme='blue'>
                      Add to cart
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            ))
          }
        </Grid>
    </Layout>
  )
}

export default LandingPage
