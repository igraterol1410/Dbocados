import Layout from "@/components/layout/Layout"
import NavbarDashboard from "@/components/layout/NavbarDashboard"
import { firebaseApp } from "@/firebase"
import { Grid, Button } from '@chakra-ui/react'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import Link from "next/link"
import { useRouter } from "next/router"


const OnboardingScreener = () => {
    const router = useRouter()
    const auth = getAuth(firebaseApp)
    onAuthStateChanged(auth, (user) => {
      if(!user){
          router.push('/')
      }
  })
  return (
    <Layout>
        <NavbarDashboard />
        <Grid 
        alignItems='center' 
        justifyContent='center'            
        h={['100%','100vh']}
        w='full'
        >
          <Link href="/dashboard">
            <Button>Ir al panel</Button>
          </Link>
        </Grid>
    </Layout>
  )
}

export default OnboardingScreener
