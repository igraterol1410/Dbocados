import { getCourses } from '@/services/courses'
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Grid, Heading, Image, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

interface Courses {image: string, name: string, description: string}

const Courses = () => {
    const [courses, setCourses] = useState<Courses[]>([])
    useEffect(() => {
      getCourses().then((res) => setCourses(res))
    },[])
  return (
    <Box p={6} px={['4rem']}>
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
    </Box>
  )
}

export default Courses
