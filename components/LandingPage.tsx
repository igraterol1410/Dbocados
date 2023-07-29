import Layout from "./layout/Layout"
import { Box, Button, Link, Text } from '@chakra-ui/react'

const LandingPage = () => {
  return (
    <Layout>
        <Box bg='tomato'>this is the test</Box>
        <Text>It took much time to work, but it worked</Text>
        <Link href="/about-us">
            <Button>
                Go to about us page
            </Button>
        </Link>
    </Layout>
  )
}

export default LandingPage
